<!-- Setup in UptimeRobot -->
<!-- \src\app\api\health\route.ts -->

Go to uptimerobot.com and sign up/login

Click Add New Monitor

# Monitor 1 - Health Check (recommended):
Setting	Value
Monitor Type	HTTP(s)
Friendly Name	Balderas Concrete - Health
URL	https://www.balderasconcrete.com/api/health
Monitoring Interval	5 minutes

# Monitor 2 - Contact Form (optional, tests the actual endpoint):
Setting	Value
Monitor Type	HTTP(s) - Keyword
Friendly Name	Balderas Concrete - Contact API
URL	https://www.balderasconcrete.com/api/contact
Monitoring Interval	5 minutes
Keyword Type	Keyword Not Exists
Keyword	"error"

# Monitor 3 - Website (basic uptime):
Setting	Value
Monitor Type	HTTP(s)
Friendly Name	Balderas Concrete - Website
URL	https://www.balderasconcrete.com
Monitoring Interval	5 minutes

Add Alert Contacts:
Your email: email@example.com

Optional: SMS alerts
How It Works
Status Code	Meaning	UptimeRobot Action
200	All services healthy	✅ No alert
503	Service unhealthy	🚨 Alert triggered
The health endpoint returns 503 if database or email config fails, which triggers UptimeRobot alerts.

Free Tier Limits
UptimeRobot free tier includes:

50 monitors
5-minute intervals
Email alerts
Status pages
This is sufficient for monitoring site.