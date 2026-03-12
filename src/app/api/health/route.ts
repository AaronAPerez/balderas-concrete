import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/**
 * Health Check Endpoint for UptimeRobot Monitoring
 *
 * Monitors:
 * - API availability
 * - Database connectivity (Neon PostgreSQL)
 * - Environment configuration
 *
 * Setup in UptimeRobot:
 * 1. Create new monitor
 * 2. Type: HTTP(s)
 * 3. URL: https://www.balderasconcrete.com/api/health
 * 4. Monitoring interval: 5 minutes
 * 5. Alert contacts: your email/SMS
 */

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  services: {
    api: ServiceStatus;
    database: ServiceStatus;
    email: ServiceStatus;
  };
  version: string;
}

interface ServiceStatus {
  status: "up" | "down" | "unknown";
  latency?: number;
  message?: string;
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    // Simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "up",
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      status: "down",
      message: error instanceof Error ? error.message : "Database connection failed",
    };
  }
}

/**
 * Check email service configuration
 */
function checkEmailConfig(): ServiceStatus {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const hasFromEmail = !!process.env.EMAIL_FROM;
  const hasNotificationEmail = !!process.env.CONTACT_NOTIFICATION_EMAIL;

  if (hasApiKey && hasFromEmail && hasNotificationEmail) {
    return { status: "up" };
  }

  return {
    status: "down",
    message: "Missing email configuration",
  };
}

/**
 * GET /api/health
 * Returns health status of all services
 */
export async function GET() {
  const timestamp = new Date().toISOString();

  // Check all services
  const [databaseStatus] = await Promise.all([
    checkDatabase(),
  ]);

  const emailStatus = checkEmailConfig();

  // Determine overall health
  const services = {
    api: { status: "up" as const },
    database: databaseStatus,
    email: emailStatus,
  };

  const allUp = Object.values(services).every((s) => s.status === "up");
  const anyDown = Object.values(services).some((s) => s.status === "down");

  const overallStatus: HealthStatus["status"] = allUp
    ? "healthy"
    : anyDown
    ? "unhealthy"
    : "degraded";

  const health: HealthStatus = {
    status: overallStatus,
    timestamp,
    services,
    version: process.env.npm_package_version || "1.0.0",
  };

  // Return appropriate HTTP status code
  // 200 = healthy, 503 = unhealthy (UptimeRobot will alert on non-2xx)
  const httpStatus = overallStatus === "unhealthy" ? 503 : 200;

  return NextResponse.json(health, { status: httpStatus });
}

/**
 * HEAD /api/health
 * Simple ping for basic uptime monitoring
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
