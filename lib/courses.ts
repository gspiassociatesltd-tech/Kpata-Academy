// KPATA ACADEMY - COMPREHENSIVE FULL COURSES - MASTER BUILD
// Version: 4.0 - Restored all courses + comprehensive lessons
// Fixes: Lesson not found + missing exports + dropped courses

export type Lesson = {
  id: string | number
  title: string
  type?: string
  duration?: string
  content: string
  workedExample?: string
  workedExample2?: string
  sampleLab?: string
  lab?: string
  tryYourself?: string
  examTips?: string
  cheatsheet?: string
  quiz?: string
  finalProject?: string
  homework?: string
  description?: string
}

export type Course = {
  slug: string
  title: string
  description: string
  difficulty?: string
  lessons: Lesson[]
}

function genLessons(baseTitle: string, topics: {title: string, content: string}[]): Lesson[] {
  return topics.map((t, idx) => {
    const id = idx + 1
    return {
      id,
      title: `${baseTitle} Lesson ${id} - ${t.title}`,
      type: idx === topics.length -1 ? 'Capstone' : idx % 3 ===0 ? 'Theory' : 'Practical',
      duration: `${15 + (idx % 4)*5} mins`,
      content: t.content,
      workedExample: `WORKED EXAMPLE 1 - ${t.title}\nStep-by-step scenario for ${t.title}:\n1. Define problem\n2. Collect data/tools\n3. Apply method from lesson\n4. Analyze result\n5. Make decision\nExample: Using ${t.title} in real Kpata Academy context. See content for details.`,
      workedExample2: `WORKED EXAMPLE 2 - Second scenario for ${t.title}\nAlternative business case: How ${t.title} solves different problem. Shows versatility.`,
      sampleLab: `LAB: Practice ${t.title}\nTask: Apply what you learned in ${t.title}. Use tools mentioned. Submit screenshot/code/link.\nPractice link: https://www.google.com/search?q=${encodeURIComponent(t.title)}`,
      tryYourself: `Try Yourself: List 3 ways you would use ${t.title} in your own business or daily life.`,
      examTips: `Exam Tips: For ${t.title}, remember key definitions and steps. Google exam loves scenario questions.`,
      cheatsheet: `Cheatsheet ${id}: ${t.title} - Key points summarized in 2 lines.`,
      quiz: `Quiz: What is ${t.title}? Give definition and one example.`,
      finalProject: `Homework: Write 200-word explanation of ${t.title} with real example from Minna/Nigeria context. Must score 80% from Kpata Bot.`
    }
  })
}

export const COURSES: Course[] = [
  {
    slug: 'google-data-analytics',
    title: 'Google Data Analytics',
    description: 'Complete Google Data Analytics Certification - 15 full lessons',
    difficulty: 'beginner',
    lessons: [
      {
        id: 1,
        title: 'Data Analytics Lesson 1 - Introduction to Data Analytics',
        type: 'Theory', duration: '20 mins',
        content: `MAIN LESSON: Introduction to Data Analytics - Simple English

What is Data Analytics? Process of collecting, cleaning, analyzing data to make better business decisions.

Example: Shop owner in Minna checks sales book to know best product - that's analytics!

6 Steps: ASK, PREPARE, PROCESS, ANALYZE, SHARE, ACT

Types: Quantitative (numbers) vs Qualitative (words)

Career: Junior Analyst -> Analyst -> Senior -> Scientist

Tools: Excel/Sheets, SQL, R, Tableau`,
        workedExample: `Shop: Mon 5 sales, Tue 20, Wed 7. ASK: Best day? PREPARE data, PROCESS check, ANALYZE Tue highest, SHARE bar chart, ACT open longer Tue.`,
        workedExample2: `Restaurant waste: Rice 5kg waste, Beans 1kg. Analysis Rice wasted more. Action cook less rice.`,
        sampleLab: `LAB: Think of barbing salon. List 3 ASK questions data can answer.`,
        tryYourself: `List 5 quantitative and 5 qualitative data from daily life.`,
        examTips: `Memorize 6 phases in order.`,
        cheatsheet: `Data = Collect+Clean+Analyze+Decide. 6 Steps: Ask Prepare Process Analyze Share Act.`,
        quiz: `First step? ASK. Quantitative vs qualitative?`,
        finalProject: `Interview small business owner, apply 6 steps.`
      },
      {
        id: 2,
        title: 'Data Analytics Lesson 2 - Spreadsheets & Data Cleaning',
        type: 'Practical', duration: '20 mins',
        content: `Spreadsheets: Grid rows/columns. Formula =SUM(A1:A10), Function AVERAGE, VLOOKUP, Pivot Table.

Data Cleaning: Real data dirty! Missing name, wrong date 13/13/2023, duplicate, spelling Lagos vs lagos.

How: Remove duplicates, Find & Replace, Handle blanks, Change format, TRIM spaces.

Rule: Clean data = Accurate analysis. Link: https://docs.google.com/spreadsheets`,
        workedExample: `Raw: John 500 2024-13-01 invalid, john duplicate, Mary blank. Cleaning: Fix date to 2024-01-13, remove duplicate, fill blank with 0, TRIM.`,
        workedExample2: `Scores: Musa 90, Musa 90 dup, blank, musa 70 lower. Clean duplicate, capitalize, ask for blank.`,
        sampleLab: `LAB: Create table Product Qty Price 10 rows with 2 dups 1 blank. Clean.`,
        tryYourself: `Use SUM, AVERAGE, MAX, MIN.`,
        examTips: `VLOOKUP, Remove Duplicates.`,
        cheatsheet: `SUM, AVERAGE, COUNT, IF, VLOOKUP. Cleaning: Duplicates, Blanks, Trim.`,
        quiz: `Function remove spaces? TRIM. Tool summarize fast? Pivot.`,
        finalProject: `Download Kaggle sales CSV, clean fully.`
      },
      {
        id: 3,
        title: 'Data Analytics Lesson 3 - SQL Basics',
        type: 'Practical', duration: '25 mins',
        content: `SQL: Structured Query Language to talk to databases. Excel max 1M rows, SQL billions.

SELECT name FROM customers
FROM customers
WHERE age>25
ORDER BY sales DESC
GROUP BY city
JOIN combine tables

Example: ID Name City Sales 1 Musa Minna 5000. Query SELECT Name WHERE City='Minna' returns Musa.`,
        workedExample: `Task: Total sales per city. Table Minna 5000 Abuja 7000 Minna 3000. Query SELECT City SUM(Amount) GROUP BY City Result Minna 8000 Abuja 7000.`,
        workedExample2: `Join Customers ID Name + Orders OrderID CustomerID Amount. SELECT Customers.Name Orders.Amount FROM Customers JOIN Orders ON ID=CustomerID`,
        sampleLab: `LAB: w3schools.com/sql/trysql.asp Practice SELECT * , SELECT City WHERE Country='Nigeria', COUNT.`,
        tryYourself: `Write query customers Minna sales>5000.`,
        examTips: `SELECT FROM WHERE GROUP BY ORDER BY JOIN order.`,
        cheatsheet: `SELECT->FROM->WHERE->GROUP BY->ORDER BY. JOIN combines.`,
        quiz: `Clause filters after grouping? HAVING.`,
        finalProject: `Create 2 tables Students Grades 5 rows, write 3 queries.`
      },
      {
        id: 4,
        title: 'Data Analytics Lesson 4 - Data Visualization',
        type: 'Practical', duration: '20 mins',
        content: `Visualization: Brain understands pictures faster. Chart shows trend in 2 sec vs table 2 min.

Bar: Compare categories Sales by City
Line: Trend over time Sales Jan-Dec
Pie: Parts of whole Market share %
Scatter: Relationship Age vs Spending
Map: Location

Principles: Simple, label axes, color meaningful, one chart one message. Tools: Tableau Public free, Looker Studio https://lookerstudio.google.com, Power BI.`,
        workedExample: `Sales Dashboard Jan 10k Feb 15k Mar 8k Goal trend. Steps Looker Studio Blank Report Add Data Google Sheets Add Chart Line Dimension Month Metric Sales Result Feb best.`,
        workedExample2: `Product A 50 B 30 C 100 Best Bar C tallest, Pie C 55%. Bar for comparison pie for %.`,
        sampleLab: `LAB: Looker Studio https://lookerstudio.google.com Import sample data create Bar Sales by Product Line Sales over Time Share link.`,
        tryYourself: `Dashboard 3 charts same dataset which tells best story?`,
        examTips: `Trend=Line Comparison=Bar Composition=Pie Relationship=Scatter.`,
        cheatsheet: `Bar=Compare Line=Trend Pie=% Scatter=relationship Map=location.`,
        quiz: `Sales by region best? Bar/Map. 12 months? Line.`,
        finalProject: `Build dashboard Title 3 charts bar line pie 1 filter Topic shop sales.`
      },
      {
        id: 5,
        title: 'Data Analytics Lesson 5 - R Programming Basics',
        type: 'Practical', duration: '25 mins',
        content: `R: Programming for statistics, free, powerful, many packages, great charts, Google analysts use.

Install https://cran.r-project.org + RStudio
Variable x <-5
Vector scores <- c(90,80,70)
Data frame data.frame(name=c("Musa","Aisha"), age=c(25,30))
Function mean(scores) average 80
install.packages("ggplot2") library(ggplot2)
Functions mean sum sd head summary`,
        workedExample: `scores <- c(85,90,78,92,88) mean 86.6 max 92 min 78 sort. students data.frame name Musa Aisha John score 85 90 78 print. Chart library ggplot2 ggplot aes x=name y=score geom_bar stat identity`,
        workedExample2: `Clean NA scores <- c(90,NA,85) mean na.rm=TRUE 87.5 Filter subset students score>80`,
        sampleLab: `LAB: Install R RStudio Run x<-c(10,20,30,40,50) mean sum Create data.frame 5 friends names ages summary Submit.`,
        tryYourself: `Vector 10 sales numbers mean median sd.`,
        examTips: `<- assignment c vector data.frame table mean library.`,
        cheatsheet: `x<-5 c(1,2,3) data.frame mean sum library install.packages`,
        quiz: `Assign in R? <- Average? mean.`,
        finalProject: `20 sales values mean max min sd bar chart ggplot2.`
      },
      {
        id: 6,
        title: 'Data Analytics Lesson 6 - Ask, Prepare, Process Deep Dive',
        type: 'Theory', duration: '20 mins',
        content: `ASK: Define problem stakeholders questions SMART Specific Measurable Action-oriented Relevant Time-bound Bad How are sales? Good What was sales increase Product A Minna last 30 days? Data needed not assumptions.

PREPARE: Where data Internal vs External Credibility ROCCC Reliable Original Comprehensive Current Cited Types First-party you collected Second-party partner Third-party bought Bias Selection Observer.

PROCESS: Cleaning manual vs automated Tools Spreadsheets SQL R Python Checklist Duplicates blanks outliers age 200 formatting misspellings Documentation log lineage.

Example Hospital ASK Why wait long? PREPARE check-in/out staff PRE PROCESS remove test fix time.`,
        workedExample: `Kpata Academy Stakeholder CEO Godwin Bad Is academy doing well? SMART What is completion rate Google Data Analytics Minna last 90 days what lessons lowest? Specific Measurable Action Relevant Time-bound. PREPARE platform database student progress ROCCC.`,
        workedExample2: `Ages 22 25 999 23 999 outlier error check source typo 99? Remove Document Removed 999 error not reliable.`,
        sampleLab: `LAB: Topic food delivery Write Bad + SMART question List 2 data sources PREPARE ROCCC List 3 PROCESS cleaning.`,
        tryYourself: `Find Kaggle dataset Evaluate ROCCC.`,
        examTips: `SMART ROCCC letters!`,
        cheatsheet: `ASK=SMART PREPARE=ROCCC+Types PROCESS=Cleaning checklist`,
        quiz: `ROCCC? Reliable Original Comprehensive Current Cited.`,
        finalProject: `Full Ask-Prepare-Process report Why students drop off 300 words.`
      },
      {
        id: 7,
        title: 'Data Analytics Lesson 7 - Analyze & Share',
        type: 'Theory', duration: '25 mins',
        content: `ANALYZE: Tools Spreadsheets pivot SQL group by R statistics Tableau visual Methods Correlation Sorting Filtering mean median mode Storytelling Insight not just numbers Sales drop 20% Mondays shop closes early.

SHARE: Who audience CEO high-level team detail Visualization right chart story Presentation Question analysis recommendation McCandless Introduction Insight Impact.

ACT: Put insight into action Implement measure Data-driven.

Ethics Privacy Consent Anonymization. Google cert exam covers 6 phases heavily.`,
        workedExample: `Sales vs Ad Month Ad Spend Sales Jan 1000 10000 Feb 2000 20000 Mar 3000 28000 Analysis Ad increases Sales increases Positive correlation Every 1000 ad sales increase 9000 Share Line chart both up Act Increase ad 4000 expect 37000.`,
        workedExample2: `Bad Share Sales is 10000 20000 28000 numbers Good Sales grew 180% Jan-Mar correlated ad spend Recommendation Increase budget 33% maximize profit See chart CEO understands impact.`,
        sampleLab: `LAB: Take sales data Calculate correlation Sheets =CORREL() Create 1 chart Write 3-bullet Share Insight Evidence Recommendation.`,
        tryYourself: `Analyze phone usage screen time per day Find pattern share insight.`,
        examTips: `Analyze Pivot SQL R Share Audience chart.`,
        cheatsheet: `Analyze=Correlation calc pivot Share=Audience+Chart+Story Act=Decision.`,
        quiz: `Phase presents findings? Share Implements? Act.`,
        finalProject: `Case study Analyze completion data 20 rows Show Analyze calc Share chart Act recommendation.`
      },
      {
        id: 8,
        title: 'Data Analytics Lesson 8 - Capstone Case Study',
        type: 'Project', duration: '60 mins',
        content: `CAPSTONE: Real Job Interview Project Bellabeat or Kpata Shop.

Bellabeat makes wellness products Question How can Bellabeat smart devices trends inform marketing?

Your Job 1 ASK Define business task Analyze FitBit trends 2 PREPARE Dataset FitBit Daily Activity 30 days 33 users Kaggle 3 PROCESS Clean Remove 0 steps fix dates duplicates 4 ANALYZE Avg steps active minutes correlation steps calories day most active 5 SHARE 3 visualizations Avg steps weekday bar Steps vs Calories scatter Daily active minutes line Insights 6 ACT Recommend marketing campaign.

Deliverables Presentation slides + Documentation. Employers ask interview!`,
        workedExample: `Ask What are trends smart device usage? Prepare Source FitBit Data Kaggle 30 users reliable original current 2023 Process 100 rows 0 steps removed documented Analyze Average 7500 Most active Tue Sat Correlation 0.7 30% use <10 days low Share Bar weekday Tue/Sat highest Insight mid-week weekend Recommendation Push notifications Tue/Sat Act Recommend motivational message low-activity days Gets certificate!`,
        workedExample2: `KPATA SHOP Question Which lessons lowest completion? Data Student progress Finding Lesson 2 and 5 40% drop Recommendation Add examples lesson2 video lesson5 Action Update re-measure after 30 days Apply to own business.`,
        sampleLab: `FINAL LAB CAPSTONE Choose dataset FitBit Kaggle or Kpata progress 30 rows or Superstore Sales Do full 6 phases report 1 page Ask 1 Prepare ROCCC 1 Process cleaning log 2 Analyze 2 calc insights 2 Share charts story 1 Act recommendation Submit Google Doc link Portfolio piece job!`,
        tryYourself: `Present capstone friend 5 min Can they understand recommendation?`,
        examTips: `Case Study mandatory Follow 6 phases exactly Bellabeat template.`,
        cheatsheet: `Ask business task Prepare source ROCCC Process cleaning Analyze 2 insights Share charts Act recommendation.`,
        quiz: `Capstone phases? 6 Visualizations? Yes 2-3 minimum.`,
        finalProject: `Submit full capstone Slides 6 slides + dashboard Looker Studio Score 80% complete certification Congratulations job-ready Junior Data Analyst!`
      },
      { id: 9, title: 'Data Analytics Lesson 9 - Spreadsheets Advanced', type: 'Practical', duration: '30 mins', content: 'Advanced: Pivot deep dive Advanced formulas INDEX-MATCH better than VLOOKUP ARRAYFORMULA QUERY Data validation Conditional formatting Create interactive dashboard Sheets using slicers. Pivot Rows=Product Values=SUM(Sales) Instantly total per product. INDEX-MATCH =INDEX(return_col MATCH lookup_val lookup_col 0) no column count issue.', workedExample: 'Pivot Rows Product Values SUM Sales Instantly.', workedExample2: 'INDEX-MATCH better.', sampleLab: 'Build pivot 100 rows sales group by month.', tryYourself: 'QUERY =QUERY(A1:D100 "select B sum(C) where D>100 group by B")', examTips: 'Pivot heavy exam.', cheatsheet: 'Pivot Drag fields INDEX-MATCH>VLOOKUP', quiz: 'Sum with condition? SUMIF', finalProject: 'Interactive dashboard Sheets pivot slicer.' },
      { id: 10, title: 'Data Analytics Lesson 10 - SQL Advanced', type: 'Practical', duration: '30 mins', content: 'Advanced SQL Subqueries query inside query CTEs WITH clause Window functions ROW_NUMBER RANK CASE statements Data types Temporary tables Cleaning SQL TRIM CAST COALESCE nulls Handling duplicates ROW_NUMBER partition. Subquery SELECT * FROM (SELECT City SUM(Sales) total FROM Sales GROUP BY City) WHERE total>10000', workedExample: 'Subquery example.', workedExample2: 'Window SELECT Name Sales RANK OVER ORDER BY Sales DESC rank', sampleLab: 'Practice window functions W3Schools.', tryYourself: 'CASE SELECT Name CASE WHEN Sales>10000 THEN High ELSE Low END', examTips: 'Window functions advanced tested.', cheatsheet: 'Subquery CTE WITH Window RANK CASE WHEN', quiz: 'What is CTE?', finalProject: 'Write 5 advanced queries subquery CTE window CASE cleaning.' },
      { id: 11, title: 'Data Analytics Lesson 11 - R Advanced & Visualization', type: 'Practical', duration: '35 mins', content: 'R advanced dplyr filter select mutate arrange group_by summarise ggplot2 advanced aes geom_point geom_line facets themes Tidyverse Import CSV read.csv Export Handling factors Real project Analyze COVID data. dplyr library dplyr data %>% filter city==Minna group_by product summarise total=sum(sales)', workedExample: 'dplyr example.', workedExample2: 'ggplot2 advanced ggplot data aes x=sales y=profit color=city geom_point facet_wrap year', sampleLab: 'Use dplyr clean summarize FitBit data.', tryYourself: 'Install tidyverse practice pipe %>%', examTips: 'dplyr verbs filter select mutate arrange group_by summarise.', cheatsheet: 'dplyr + ggplot2 = 90% R work.', quiz: 'Pipe operator? %>% or |>', finalProject: 'Full R analysis Import CSV clean dplyr visualize ggplot2 3 charts.' },
      { id: 12, title: 'Data Analytics Lesson 12 - Tableau Deep Dive', type: 'Practical', duration: '30 mins', content: 'Tableau Connect data Dimensions vs Measures Marks card Filters Parameters Calculated fields Joins Blends Dashboards Stories Publishing Tableau Public Best practices Keep dashboard under 3 views use filters tell story. Calculated field Profit Margin = SUM(Profit)/SUM(Sales) Add view.', workedExample: 'Calculated field Profit Margin.', workedExample2: 'Dashboard Combine bar map KPI one dashboard filter year.', sampleLab: 'Tableau Public Create dashboard Superstore dataset.', tryYourself: 'Create parameter switch Sales Profit.', examTips: 'Dimensions qualitative Measures quantitative.', cheatsheet: 'Dimensions vs Measures Calculated field Dashboard.', quiz: 'Dimension vs measure?', finalProject: 'Publish Tableau dashboard public profile link portfolio.' },
      { id: 13, title: 'Data Analytics Lesson 13 - Data Ethics & Privacy', type: 'Theory', duration: '20 mins', content: 'Ethics Informed consent Anonymization remove PII Data bias historical sampling Fairness Privacy laws GDPR EU NDPR Nigeria Data Protection Regulation De-identification k-anonymity Responsible AI Case studies Bias hiring algorithms As analyst protect privacy. Anonymization Replace names ID 1 2 3 Remove phone before sharing analysis.', workedExample: 'Anonymization Replace names ID.', workedExample2: 'Bias If train hiring model only male resumes discriminate Need diverse data.', sampleLab: 'Review dataset PII List fields anonymize before sharing.', tryYourself: 'What is NDPR? Nigeria Data Protection Regulation.', examTips: 'Ethics questions appear cert.', cheatsheet: 'Consent Anonymize Bias check GDPR NDPR.', quiz: 'What is PII?', finalProject: 'Write data ethics checklist capstone.' },
      { id: 14, title: 'Data Analytics Lesson 14 - Job Preparation', type: 'Career', duration: '30 mins', content: 'Resume Highlight tools SQL Sheets Tableau R Projects Capstone +2 more Portfolio GitHub website dashboards links LinkedIn optimization Interview STAR Situation Task Action Result behavioral Technical interview SQL query whiteboard case study Salary negotiation Apply LinkedIn Indeed local companies. Resume bullet Analyzed sales data 10k rows using SQL Tableau identified 15% growth opportunity presented management led N500k increased sales', workedExample: 'Resume bullet example.', workedExample2: 'STAR Q Tell time handled difficult data S Data messy sales T Need clean 2 days A Used SQL clean duplicates R Delivered time analysis accurate.', sampleLab: 'Create 1-page resume Junior Data Analyst using capstone.', tryYourself: 'Practice STAR stories 3 common questions.', examTips: 'Portfolio > Certificate alone Show projects.', cheatsheet: 'Resume Tools Projects Impact numbers STAR interviews.', quiz: 'What is STAR?', finalProject: 'Complete portfolio Resume LinkedIn 2 dashboards links.' },
      { id: 15, title: 'Data Analytics Lesson 15 - Final Exam & Certification', type: 'Exam', duration: '60 mins', content: 'Final preparation Review all 6 phases SQL SELECT WHERE GROUP BY Spreadsheets VLOOKUP Pivot R mean data.frame Visualization chart choice Ethics Capstone structure Google Certificate exam 8 courses each quizzes final Must pass all get certificate Coursera After add LinkedIn share Next Learn Python Advanced SQL Power BI Keep practicing Kaggle datasets Congratulations!', workedExample: 'Practice Exam 1 First phase ASK 2 SQL sum SELECT SUM 3 Best chart trend Line 4 Remove duplicates Sheets Data Remove duplicates.', workedExample2: 'Next learning path Google Advanced Data Analytics IBM Data Science.', sampleLab: 'Take Google practice quiz coursera.org professional-certificates google-data-analytics', tryYourself: 'Mock interview Explain capstone 3 minutes.', examTips: 'Final exam Focus 6 phases SQL basics chart choice cleaning.', cheatsheet: '6 Phases + SQL + Sheets + R + Visualization + Ethics = Certificate', quiz: 'Full mock quiz 10 questions all topics.', finalProject: 'FINAL Submit all Capstone slides +2 dashboards + Resume Score 80% earn Kpata Academy Certificate Google Data Analytics Share LinkedIn tag Kpata Academy!' }
    ]
  },
  {
    slug: 'google-project-management',
    title: 'Google Project Management',
    description: 'Complete Google Project Management - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('Project Management', [
      {title: 'Foundations of Project Management', content: 'Project = Temporary effort create unique product. Project vs Operations temporary vs ongoing. Triple Constraint Scope Time Cost change one affects others. Role PM Plan organize lead. Methodologies Waterfall sequential vs Agile iterative. Example Building Kpata Academy is project. Building house Scope 3 bedrooms Time 6 months Cost N10m If add bedroom time/cost increase.'},
      {title: 'Project Initiation & Stakeholders', content: 'Initiation First phase Identify stakeholders define goals create Project Charter document Charter includes Purpose objectives stakeholders scope risks budget high-level Stakeholder analysis Power/Interest grid CEO High Power High Interest Manage closely Students Low Power High Interest Keep informed. Charter first document signed by sponsor.'},
      {title: 'Project Charter Deep Dive', content: 'Charter Example Project Kpata Academy Platform Purpose Provide free tech education Objectives 1000 students 6 months Stakeholders CEO Students Developers Budget N0 free tier Risks Internet outage Mitigation hotspot. SMART goals Specific Measurable Achievable Relevant Time-bound.'},
      {title: 'Planning - WBS & Scope', content: 'Planning WBS Work Breakdown Structure Break project into small tasks Example Build website = Design Frontend Backend Test Schedule Gantt chart shows tasks over time dependencies Task B cannot start before A. WBS 100% rule sum children = 100% parent. Scope creep - uncontrolled scope increase Prevent change control.'},
      {title: 'Planning - Schedule & Budget', content: 'Schedule Gantt dependencies critical path longest path determines project duration. Budget Estimate costs bottom-up each task cost sum top-down analogous parametric. Tools Asana Jira Sheets Gantt. Example Lesson creation Week1-2 Platform Week2-3 Test Week4 Dependency Test after Platform.'},
      {title: 'Budgeting & Resource Allocation', content: 'Budget types Analogous (previous similar project), Parametric (cost per unit), Bottom-up (detailed). Resource allocation People equipment materials. Cost baseline. Earned Value Management PV Planned Value EV Earned Value AC Actual Cost.'},
      {title: 'Agile Fundamentals', content: 'Agile Iterative flexible customer feedback Values Individuals over processes Working software over docs Customer collaboration Responding to change Principles 12 agile principles. Vs Waterfall Agile welcomes changing requirements.'},
      {title: 'Scrum Framework', content: 'Scrum Roles Product Owner what Scrum Master process Dev Team build Events Sprint 2 weeks Daily Standup 15 min Sprint Review Retrospective Artifacts Product Backlog Sprint Backlog Increment. User stories As a student I want to watch lessons so that I can learn. Kanban To Do In Progress Done.'},
      {title: 'Team Management & Leadership', content: 'Leadership styles Authoritarian Democratic Laissez-faire Situational. Team development Forming Storming Norming Performing Adjourning Tuckman. RACI Responsible Accountable Consulted Informed Example Writer Responsible CEO Accountable Students Consulted Marketing Informed. Conflict resolution.'},
      {title: 'Communication & Stakeholder Management', content: 'Communication 80% PM job! Communication plan Who What When How. Stakeholder engagement Assess engagement level Unaware Resistant Neutral Supportive Leading. Manage expectations. Tools Slack Email Meetings. Active listening.'},
      {title: 'Risk Management', content: 'Risk Identify Assess Probability x Impact Mitigate Avoid Mitigate Transfer Accept Monitor Risk register Risk description Probability Impact Mitigation Owner. Example Risk Internet outage Probability Medium Impact High Mitigation offline backup hotspot.'},
      {title: 'Quality Management', content: 'Quality Planning Quality Assurance Quality Control. Standards ISO. Testing Inspection. Cost of quality Prevention vs Failure. Continuous improvement Kaizen. Example Lesson quality checklist Content accurate Examples clear Lab working.'},
      {title: 'Procurement & Vendor Management', content: 'Procurement Make or Buy decision Vendor selection Contract types Fixed price Time and materials. SOW Statement of Work. Vendor management Performance metrics. Example Procuring hosting Vercel free tier vs AWS.'},
      {title: 'Monitoring, EVM & Closing', content: 'Monitoring Track progress vs plan EVM PV EV AC SPI=EV/PV CPI=EV/AC If SPI<1 behind schedule CPI<1 over budget. Example PV N100k 50% work EV N80k 40% actual AC N90k SPI 0.8 behind CPI 0.89 over budget. Closing Lessons learned Retrospective Handover Celebrate Procurement closure.'},
      {title: 'Capstone - Full Project', content: 'Capstone Full project Initiation to Closing Choose project Kpata Academy feature Build competition dashboard Deliverables Charter WBS Gantt Budget Risk register RACI Retrospective. This completes Google Project Management certificate Portfolio piece for job.'}
    ])
  },
  {
    slug: 'google-cybersecurity',
    title: 'Google Cybersecurity',
    description: 'Complete Google Cybersecurity - 15 lessons',
    difficulty: 'intermediate',
    lessons: genLessons('Cybersecurity', [
      {title: 'Cybersecurity Foundations & CIA Triad', content: 'CIA Triad Confidentiality only authorized see Integrity data not tampered Availability systems up. Threats Malware virus ransomware Phishing Social Engineering Defense in depth multiple layers Frameworks NIST ISO 27001 Ethics. Phishing From admin@googIe.com I instead of l asking password Check sender dont click.'},
      {title: 'Threats, Vulnerabilities & Risk', content: 'Threat actor motive Intent to harm Vulnerability weakness Risk likelihood impact. Types Malware Ransomware Trojan Spyware Phishing Spear phishing Whaling Social Engineering Pretexting Baiting. Risk assessment Risk = Threat x Vulnerability x Impact.'},
      {title: 'Networks & OSI Model', content: 'Networks OSI 7 layers Physical Data Link Network Transport Session Presentation Application TCP/IP 4 layers Ports 80 HTTP 443 HTTPS 22 SSH 53 DNS 25 SMTP Firewalls filter IDS detect IPS prevent. Logs Syslog NetFlow Packet capture Wireshark.'},
      {title: 'Common Attacks', content: 'DDoS flood Man-in-the-Middle Brute Force try passwords SQL Injection Input OR 1=1 bypass login XSS Cross-site scripting Malware types. Prevention Input sanitization Lock account after 5 fails 2FA. Example Brute force 1000 passwords sec Prevent lock + 2FA.'},
      {title: 'Linux Basics for Security', content: 'Linux commands ls list cd change pwd path cat read grep search chmod permissions sudo admin useradd ps processes netstat network. Important for analysts. grep Failed password /var/log/auth.log finds failed SSH. chmod 600 secure file.'},
      {title: 'SQL for Security Analysts', content: 'SQL for logs SELECT * FROM log WHERE event=failed_login. Joins Count failed per IP SELECT ip COUNT(*) FROM log WHERE event=failed GROUP BY ip HAVING COUNT>5. SIEM Splunk Chronicle collect logs Query logs for threats.'},
      {title: 'Python for Security Automation', content: 'Python Parse logs check hashes automate. Example for line in logfile if FAILED in line count+=1 print count. Script find IPs >5 fails. Libraries re os hashlib requests. Automation reduces manual work 80%. Example Python script to analyze auth log report IPs.'},
      {title: 'Cryptography & Hashing', content: 'Cryptography Encryption symmetric same key asymmetric public private Hashing MD5 SHA256 irreversible for integrity Digital signatures Certificates SSL/TLS HTTPS. Hash verify file not tampered. Password hashing bcrypt not plain.'},
      {title: 'Identity & Access Management', content: 'IAM Authentication who are you Password 2FA MFA Biometrics Authorization what can you do Least privilege Role-based access RBAC Account lifecycle Joiner Mover Leaver. Privileged access management.'},
      {title: 'Detection - SIEM & Alerts', content: 'SIEM Splunk Chronicle IBM QRadar Collect logs Correlate Alert. Rules If 5 failed logins from same IP in 1 min alert. Triage Priority Severity False positive tuning. Use cases Brute force impossible travel.'},
      {title: 'Incident Response Lifecycle', content: 'IR 1 Preparation 2 Detection Analysis 3 Containment 4 Eradication 5 Recovery 6 Lessons Learned Playbooks Step-by-step phishing malware Triage Priority Severity Containment Isolate machine Eradication Remove malware patch Recovery Restore backup Lessons training.'},
      {title: 'Digital Forensics Basics', content: 'Forensics Preserve evidence Chain of custody Imaging disk Write blocker Timeline analysis File recovery Log analysis Tools Autopsy Volatility Wireshark. Legal hold Do not alter evidence.'},
      {title: 'Vulnerability Management', content: 'Scan Identify vulnerabilities CVE database CVSS scoring High Medium Low Patch management Prioritize patch High risk Patch Tuesday Test patch before production. Example Log4j CVE-2021-44228 critical patch immediately.'},
      {title: 'Security Hardening & Best Practices', content: 'Hardening Disable unnecessary services Change default passwords Update regularly Principle least privilege Firewall rules Secure configuration benchmarks CIS. Endpoint hardening Antivirus EDR. Network hardening Segmentation.'},
      {title: 'Capstone - SOC Analyst Simulation', content: 'Capstone Simulate SOC Analyst day Alert Brute force attempt from IP Analyze logs Contain block IP Eradicate reset passwords Recovery monitor Lessons learned Report Write incident report Timeline Actions Recommendation Block IP range implement fail2ban. This completes Google Cybersecurity certificate.'}
    ])
  },
  {
    slug: 'google-it-support',
    title: 'Google IT Support',
    description: 'Complete Google IT Support - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('IT Support', [
      {title: 'IT Support Foundations', content: 'IT Support Role Help users fix tech issues Customer service Empathy Troubleshooting mindset. Hardware CPU RAM Storage Motherboard Peripherals. Software OS Applications. Ticketing system Jira ServiceNow. Example User cannot print Check cable driver queue.'},
      {title: 'Computer Hardware & Assembly', content: 'Hardware CPU brain RAM short-term memory Storage long-term HDD SSD Motherboard connects Power supply RAM types DDR4 DDR5 Ports USB HDMI Ethernet. Assembly Build PC Install CPU RAM Storage Connect power. Safety ESD wrist strap.'},
      {title: 'Operating Systems - Windows & Linux', content: 'OS Windows Linux macOS File systems NTFS ext4 FAT32 Processes Services Registry Device Manager Task Manager Linux commands ls cd pwd cat grep chmod. Dual boot Virtual machine VirtualBox. OS installation Steps.'},
      {title: 'Networking Fundamentals', content: 'Networking IP address 192.168.1.1 Subnet mask DNS translates name to IP DHCP assigns IP automatically TCP vs UDP reliable vs fast Ping traceroute ipconfig ifconfig. Cables Ethernet Fiber Wireless WiFi 2.4GHz 5GHz. Routers Switches.'},
      {title: 'Active Directory & User Management', content: 'Active Directory Microsoft directory service Users Groups Organizational Units Group Policy Manage users Create user Reset password Disable account Groups Security Distribution. Example New employee Onboarding Create AD account Email groups.'},
      {title: 'System Administration', content: 'System Admin Manage systems Updates Patch management Backup types Full Incremental Differential Restore test. RAID Redundant storage Monitoring CPU RAM Disk. Automation Scripts. Example Backup daily incremental weekly full.'},
      {title: 'Security Basics for IT Support', content: 'Security Antivirus Malware Removal Updates Password policy 2FA Encryption BitLocker Least privilege Phishing awareness. Tools Windows Defender Firewall. Example User clicked phishing Reset password scan malware educate.'},
      {title: 'Troubleshooting Methodology', content: 'Troubleshooting Steps Identify problem Establish theory Test theory Establish action plan Implement Verify Document. Example Internet not working 1 Check cable 2 Ping router 3 Ping 8.8.8.8 4 Check DNS 5 Check browser. Document solution knowledge base.'},
      {title: 'Customer Service & Ticketing', content: 'Customer Service Empathy Active listening Clear communication No jargon Manage expectations Follow up. Ticketing Prioritize Urgent High Medium Low SLA Service Level Agreement Escalation L1 L2 L3. Example Ticket User locked account Priority High Resolve 15 min.'},
      {title: 'Remote Support Tools', content: 'Remote tools Remote Desktop RDP TeamViewer AnyDesk SSH for Linux VPN Virtual Private Network Secure remote. Example User at home Cannot access files Connect VPN then RDP. Security Verify identity before remote.'},
      {title: 'Mobile Device Management', content: 'Mobile iOS Android MDM Mobile Device Management Enroll device Push policies Wipe remote Configure WiFi Email. BYOD Bring Your Own Device Policy. Example Company phone Enroll Intune Push email profile.'},
      {title: 'Cloud Basics - Google Workspace & M365', content: 'Cloud SaaS IaaS PaaS Google Workspace Gmail Drive Meet Admin console M365 Outlook OneDrive Teams Admin center User management License assignment. Example New user Create Google Workspace account Assign license Add to groups.'},
      {title: 'Printers & Peripherals Troubleshooting', content: 'Printers Types Laser Inkjet Common issues Paper jam Driver offline Spooler service. Peripherals Keyboard mouse monitor projector. Steps Check physical connection Driver Queue Spooler restart. Example Printer offline Check cable Restart spooler Reinstall driver.'},
      {title: 'Documentation & Knowledge Base', content: 'Documentation Write clear steps Screenshot Video Knowledge base Confluence SharePoint. SOP Standard Operating Procedure. Example Document How to reset password Step1 Go to portal Step2 Click forgot Step3 etc. Benefits Faster resolution train new staff.'},
      {title: 'Capstone - IT Support Simulation', content: 'Capstone Simulate Helpdesk day 5 tickets Ticket1 Password reset Ticket2 Printer offline Ticket3 Slow PC Ticket4 Email not syncing Ticket5 New employee setup. Handle prioritize document Use ticketing system. Write incident reports. This completes Google IT Support certificate Ready for CompTIA A+.'}
    ])
  },
  {
    slug: 'google-digital-marketing',
    title: 'Google Digital Marketing & E-commerce',
    description: 'Complete Digital Marketing - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('Digital Marketing', [
      {title: 'Digital Marketing Foundations', content: 'Marketing Traditional vs Digital Funnel Awareness Consideration Conversion Loyalty Digital channels SEO Social Media Email Paid ads. Customer journey Touchpoints. Example Kpata Academy Awareness via social Consideration free lesson Conversion paid cert Loyalty referral.'},
      {title: 'Search Engine Optimization SEO', content: 'SEO Optimize website rank higher Google organic not paid Keywords Research tools Google Keyword Planner On-page Title meta description headings Content quality Off-page Backlinks Technical Site speed Mobile friendly. Example Keyword best data analytics course Nigeria Create content around it.'},
      {title: 'Search Engine Marketing SEM & Google Ads', content: 'SEM Paid search Google Ads Keywords bidding Quality Score Ad Rank CPC Cost Per Click Campaign structure Campaign Ad group Keywords Ads. Example Campaign Kpata Academy Ad group Data Analytics Keywords data analytics course Nigeria Bid N50 CPC Budget N5000 daily.'},
      {title: 'Social Media Marketing', content: 'Platforms Facebook Instagram LinkedIn Twitter TikTok Strategy Content calendar Engage Respond Analytics Insights. Paid social Boost post Targeting demographics interests. Example Kpata Instagram Post student success story Reel lesson snippet Story poll. Metrics Reach Engagement Followers.'},
      {title: 'Email Marketing', content: 'Email List building Lead magnet free ebook Segment personalization Subject line open rate Content value Call to action CTA A/B testing Automation Welcome series Abandoned cart. Tools Mailchimp ConvertKit. Example Welcome series Day1 Welcome Day3 Lesson1 Day7 Certificate offer. Metrics Open rate 20% Click 3%.'},
      {title: 'Content Marketing & Strategy', content: 'Content Value not sales Blog Video Infographic Podcast Ebook Strategy Persona Buyer persona Pain points Content pillars Editorial calendar SEO. Example Kpata Content pillars Career tips Lesson previews Student stories Tech news. Repurpose Blog -> Tweet -> Reel.'},
      {title: 'E-commerce Fundamentals', content: 'E-commerce B2C B2B C2C Platforms Shopify WooCommerce Jumia Payment gateway Paystack Flutterwave Logistics Product listing Photos description Price Inventory. Example Kpata shop Sell certificates Price N5000 Paystack integration Deliver via email.'},
      {title: 'Analytics - Google Analytics', content: 'Analytics Google Analytics 4 GA4 Metrics Users Sessions Pageviews Bounce rate Conversion Goals Events Traffic source Organic Paid Social Direct. Reports Realtime Acquisition Engagement Monetization. Example Kpata GA4 Users 1000 from Instagram 600 from Google Conversion 5% enrolled.'},
      {title: 'Customer Loyalty & Retention', content: 'Loyalty More expensive acquire new vs retain existing Strategies Email loyalty program Community Referral Discount Personalization. Churn rate Retention rate. Example Kpata Loyalty After course completion Offer next course 20% off Referral N500 commission Community WhatsApp group.'},
      {title: 'Marketing Budget & ROI', content: 'Budget Allocate channels Test small scale up winners ROI Return Investment ROAS Return Ad Spend Calculation Revenue - Cost / Cost *100. Example Spend N10000 ads Revenue N50000 ROI 400% ROAS 5x. Budget N100k Split SEO 30% Ads 40% Social 20% Email 10%.'},
      {title: 'Brand Building', content: 'Brand Identity Logo Colors Voice Values Storytelling Differentiation Unique selling proposition USP Example Kpata Brand Free 100% No registration Nigerian context Pidgin Hausa Yoruba Igbo Community driven USP Free practical Nigerian-focused tech education.'},
      {title: 'Conversion Rate Optimization', content: 'CRO Improve % visitors who convert A/B testing Headline CTA Color Button text Landing page optimization Speed Mobile Form fewer fields Social proof Testimonials. Example Kpata Landing Page Test Headline Learn Data Analytics Free vs Become Data Analyst in 30 Days Free Which converts higher?'},
      {title: 'Influencer & Affiliate Marketing', content: 'Influencer Micro macro nano Affiliate Pay commission per sale Partnership. Find influencers in niche Tech influencers Nigeria. Affiliate program 20% commission per referral. Example Partner tech YouTuber Review Kpata Academy Affiliate link.'},
      {title: 'Marketing Automation & Tools', content: 'Automation Save time Tools HubSpot Mailchimp Buffer Hootsuite Canva Google Analytics Meta Business Suite. Workflow If user signs up -> Send welcome email -> Day3 lesson reminder -> Day7 certificate offer. Example Automate Kpata welcome series using Mailchimp free.'},
      {title: 'Capstone - Full Marketing Campaign', content: 'Capstone Create full campaign for Kpata Academy Choose product Google Data Analytics course Define persona Persona Chinedu 25 Lagos wants career change Channels Instagram Google Ads Email Budget N50000 Duration 30 days Content 10 posts 2 emails 1 landing page Metrics Target 500 users 50 conversions ROI calculate. Present campaign slides. Completes Google Digital Marketing certificate.'}
    ])
  },
  {
    slug: 'google-ux-design',
    title: 'Google UX Design',
    description: 'Complete Google UX Design - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('UX Design', [
      {title: 'UX Design Foundations', content: 'UX User Experience How user feels using product UI User Interface visual design Difference UX is feeling UI is look. Design thinking 5 stages Empathize Define Ideate Prototype Test. Example Kpata Academy UX If student confused lesson navigation Bad UX Improve with progress bar.'},
      {title: 'Empathize - User Research', content: 'Empathize Understand user Methods Interviews Surveys Observations Diary studies Empathy map What user Says Thinks Does Feels Pain points Gains. Example Interview 5 students Why drop off Lesson2 too difficult No examples. Pain point Need more examples.'},
      {title: 'Define - Problem Statements & Personas', content: 'Define Synthesize research Affinity diagram Group insights Problem statement As a type user I want to goal so that benefit. Persona Fictional user Represents group Name Age Goals Frustrations. Example Persona Musa 28 Minna wants data analyst job Frustrated courses too expensive theory no practical.'},
      {title: 'Ideate - Brainstorming Solutions', content: 'Ideate Generate many ideas No judgment Quantity over quality Methods Brainstorm Crazy 8s How Might We Mind map. Example HMW How might we make lessons more practical for Musa? Ideas Add real Nigerian examples Add labs Add WhatsApp support Add videos Pidgin.'},
      {title: 'Wireframing & Information Architecture', content: 'IA Organize content Sitemap Navigation Wireframe Low-fidelity sketch Blueprint No colors No images Focus layout. Tools Figma Balsamiq Paper. Example Kpata sitemap Home Courses Lesson Lab Dashboard Progress. Wireframe Lesson page Header Hero Main content Lab Sidebar progress.'},
      {title: 'Prototyping - Low & High Fidelity', content: 'Prototype Interactive model Low-fi Paper clickable High-fi Figma realistic Tools Figma Adobe XD InVision. Example Low-fi Paper prototype Lesson page test with user Does user find Complete button? High-fi Figma prototype with colors interactions.'},
      {title: 'Visual Design & UI Principles', content: 'UI Principles Hierarchy Important bigger Contrast Color Typography Alignment Repetition Proximity Gestalt principles Color theory Primary secondary Emotion Typography Readability Font pairing. Example Kpata UI Black hero yellow badge High contrast Progress green Readable font.'},
      {title: 'Design Systems & Components', content: 'Design system Reusable components Buttons Cards Colors Typography Icons Benefits Consistency Faster development. Example Kpata Design system Button black rounded full font-black Card white rounded 20px border zinc-200 Color black yellow green.'},
      {title: 'Usability Testing', content: 'Testing Test prototype with real users Methods Moderated Unmoderated A/B testing Metrics Success rate Time on task Error rate SUS System Usability Scale. Example Test Lesson page 5 users Task Complete Lesson 2 Observe Where struggle? Lab unclear? Fix lab instructions.'},
      {title: 'Accessibility - Inclusive Design', content: 'Accessibility Design for all disabilities Visual Auditory Motor Cognitive Guidelines WCAG Contrast 4.5:1 Alt text for images Keyboard navigation Screen reader. Example Kpata Accessibility Alt text for icons Keyboard Tab through lessons High contrast black yellow Good for low vision.'},
      {title: 'Mobile & Responsive Design', content: 'Responsive Design works all devices Desktop tablet mobile Mobile-first Design mobile first then desktop Breakpoints 640px 768px 1024px Touch targets 44px minimum. Example Kpata Lesson page Mobile sidebar bottom Desktop sidebar right Touch button large 44px.'},
      {title: 'Figma Mastery', content: 'Figma Tool for UX design Features Frames Components Auto layout Prototyping Collaboration Plugins. Tutorial Create frame 1440px Add rectangle Header Add text Lesson title Create component Button Variants Hover. Practice Recreate Kpata lesson page in Figma.'},
      {title: 'UX Writing & Content Strategy', content: 'UX Writing Words in interface Microcopy Button labels Error messages Clear concise helpful Tone voice Brand voice Example Button Complete & Next vs Submit Good clear action Error Please write at least 20 characters to pass vs Error. Good helpful.'},
      {title: 'Portfolio & Case Study', content: 'Portfolio Show process not just final Case study structure Overview Problem Research Personas Wireframes Prototypes Testing Results Learnings. Example Case study Kpata Lesson Player Problem Lesson not found students confused Process Research interview Define problem Ideate robust solution Prototype test Results 0% lesson not found errors.'},
      {title: 'Capstone - End-to-End UX Project', content: 'Capstone Full UX project Choose app Idea E-commerce for local market Steps Empathize interview 3 users Define persona problem Ideate brainstorm Wireframe sitemap 5 screens Prototype Figma clickable Test 3 users Iterate Final UI high-fidelity Present case study slides. Completes Google UX Design certificate Ready for UX designer role.'}
    ])
  },
  {
    slug: 'google-ai-essentials',
    title: 'Google AI Essentials',
    description: 'Complete Google AI Essentials - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('AI Essentials', [
      {title: 'Introduction to AI', content: 'AI Artificial Intelligence Machines mimic human intelligence Types Narrow AI one task Siri General AI human-like Future Superintelligence beyond human History 1950s Turing test 1997 Deep Blue 2016 AlphaGo 2022 ChatGPT. Example Narrow AI Kpata Bot evaluates labs Only that task.'},
      {title: 'Machine Learning Basics', content: 'ML Subset AI Learn from data without explicit programming Types Supervised Labeled data Unsupervised No labels Reinforcement Reward punishment Example Supervised Email spam labeled spam not spam Model learns predict new email spam? Unsupervised Group customers by buying behavior.'},
      {title: 'Generative AI & Large Language Models', content: 'GenAI Creates new content Text image video LLM Large Language Model Trained on huge text data Predict next word Examples ChatGPT Gemini Claude How works Transformer architecture Attention mechanism Prompt engineering. Example Prompt Write 3 quiz questions for data analytics lesson.'},
      {title: 'Prompt Engineering Mastery', content: 'Prompt Engineering Craft effective prompts Techniques Zero-shot No examples Few-shot Give examples Chain-of-thought Think step by step Role playing You are data analyst Persona Format Specify output format JSON bullet. Example Bad Explain SQL Good You are SQL tutor Explain SELECT WHERE to beginner using shop example in Minna Use simple English 100 words.'},
      {title: 'AI in Daily Work', content: 'Use AI at work Email writing Summarize meeting notes Create presentation Brainstorm ideas Data analysis. Tools Gmail Smart compose Docs AI writing Sheets formula help Slides design. Example Use Gemini in Sheets Explain this sales data trend Write formula for total sales per month.'},
      {title: 'AI for Content Creation', content: 'Create content Blog Video script Social media Image generation DALL-E Midjourney Video Runway Text-to-video. Workflow Idea -> AI draft -> Human edit -> Publish. Example Kpata Lesson Idea AI generates draft Lesson 3 SQL Basics Human adds Nigerian examples Minna shop.'},
      {title: 'AI Ethics & Bias', content: 'Ethics Bias Data bias Historical bias Representation bias Fairness Privacy Hallucination AI makes up false info Accountability Who responsible if AI wrong? Mitigation Diverse data Human review Transparency. Example Hiring AI trained only male resumes discriminates female Need diverse data + human oversight.'},
      {title: 'AI Tools Landscape', content: 'Tools Text ChatGPT Gemini Claude Perplexity Image DALL-E Midjourney Stable Diffusion Video Runway Pika Sora Code GitHub Copilot Cursor Audio ElevenLabs Suno Data analysis ChatGPT Advanced Data Analysis Julius AI. Choose tool based task.'},
      {title: 'Automation with AI', content: 'Automation Use AI automate repetitive tasks Zapier Make.com Connect apps Example If new email with invoice -> AI extracts data -> Adds to Sheets -> Sends Slack message. No code automation Saves 10 hours week.'},
      {title: 'AI for Data Analysis', content: 'AI helps analyze data ChatGPT Upload CSV Ask What are trends? Create chart? Explain correlation? Tools ChatGPT Code Interpreter Claude Analysis Julius. Example Upload sales data Ask What month best sales? Why? Create bar chart recommendation.'},
      {title: 'AI in Business Strategy', content: 'Business AI strategy Identify opportunities Automate customer support Personalize marketing Optimize operations New products AI-powered. Framework Assess data readiness Identify use cases Pilot Measure Scale. Example Kpata Use case AI Tutor 24/7 answers student questions Personalize learning path.'},
      {title: 'Responsible AI Use', content: 'Responsible Use Verify AI output Fact check Sensitive data Dont share private company data with public AI Plagiarism Cite AI assistance Transparency Tell when AI used. Example Student Use AI for homework Must understand not just copy Cite AI helped with outline.'},
      {title: 'Future of AI', content: 'Future Trends AGI Artificial General Intelligence Multimodal Text image video combined AI agents Autonomous perform tasks Robotics Embodied AI Regulation EU AI Act Nigeria NDPA AI governance. Prepare Adapt Learn AI tools Human + AI collaboration Creativity critical thinking uniquely human.'},
      {title: 'Build Your First AI Workflow', content: 'Build Simple workflow Example Content creation workflow Step1 Idea Research with Perplexity Step2 Draft with ChatGPT Step3 Create image with DALL-E Step4 Edit human Step5 Publish. Tools Connect Zapier Make. Example Build Kpata lesson creation workflow.'},
      {title: 'Capstone - AI Transformation Project', content: 'Capstone Choose business Small business in Minna Identify 3 AI use cases Example Barbing salon Use1 Chatbot answer price hours Use2 AI create social media posts Use3 AI analyze customer feedback Implement one Use case Create demo Prompt + output Present benefits time saved revenue impact. Completes Google AI Essentials certificate.'}
    ])
  },
  {
    slug: 'python-for-data',
    title: 'Python for Data & AI',
    description: 'Python programming for data analytics and AI - 15 lessons',
    difficulty: 'beginner',
    lessons: genLessons('Python', [
      {title: 'Python Setup & Basics', content: 'Python Popular programming language Easy readable Why for data AI Libraries Pandas Numpy Matplotlib Scikit-learn TensorFlow. Install python.org or Anaconda Variables x=5 Data types int float str list dict Print input. Example x=10 y=20 print x+y 30.'},
      {title: 'Control Flow - If & Loops', content: 'If condition if age>=18 print adult else minor Elif multiple conditions Loops for loop for i in range(5) print i While while x<10 x+=1 Break continue. Example For each sales if sales>10000 print High else Low.'},
      {title: 'Functions & Modules', content: 'Function Reusable code def function_name(params): return value Example def calculate_total(price qty): return price*qty Modules Import library import math import random import pandas as pd. Example import math math.sqrt(16) 4.'},
      {title: 'Data Structures - Lists Dicts', content: 'List Ordered collection fruits=[apple banana mango] fruits[0] apple Append remove. Dict Key-value person={name:Musa age:25} person[name] Musa. Tuple immutable Set unique. Example Sales list sales=[5000 7000 3000] sum max min.'},
      {title: 'File Handling & CSV', content: 'File Read write Open file open(filename mode) mode r read w write a append CSV Comma separated values Read CSV with csv module or pandas. Example Open sales.csv Read rows Calculate total. With open ensures close automatically.'},
      {title: 'Pandas - Data Manipulation', content: 'Pandas Library for data manipulation DataFrame Table Series Column Import import pandas as pd Read df=pd.read_csv(sales.csv) Head tail Info Describe Filter df[df[City]==Minna] Groupby df.groupby(City)[Sales].sum(). Example Load sales data Filter Minna Total sales.'},
      {title: 'Numpy - Numerical Computing', content: 'Numpy Numerical Python Array Faster than list np.array([1 2 3]) Operations Mean sum std Random np.random. Example Scores array np.array([85 90 78]) np.mean 84.3 np.max 90.'},
      {title: 'Data Visualization - Matplotlib & Seaborn', content: 'Visualization Matplotlib plt.plot bar chart scatter Seaborn nicer statistical plots. Example plt.bar(products sales) plt.xlabel Product plt.ylabel Sales plt.title Sales by Product plt.show() Seaborn sns.barplot data=df x=City y=Sales.'},
      {title: 'Data Cleaning with Python', content: 'Cleaning Pandas Handle missing df.fillna(0) df.dropna() Duplicates df.drop_duplicates() Outliers Type conversion df[Age]=df[Age].astype(int) Example Sales data with blank NaN fill with mean Duplicates remove.'},
      {title: 'SQL with Python', content: 'Connect Python to SQL databases sqlite3 MySQL PostgreSQL Example import sqlite3 conn=sqlite3.connect(sales.db) cursor=conn.cursor() cursor.execute(SELECT * FROM sales) rows=cursor.fetchall() print rows. Pandas read_sql query sql df=pd.read_sql_query(SELECT * FROM sales, conn).'},
      {title: 'APIs & Web Scraping', content: 'API Application Programming Interface Request data from web requests library import requests response=requests.get(https://api.example.com/data) json=response.json() Scraping BeautifulSoup Extract data from website Example Scrape Jumia product prices. Ethics Check robots.txt Respect rate limit.'},
      {title: 'Introduction to Machine Learning', content: 'ML with Python Scikit-learn Library Steps Load data Split train test Train model Predict Evaluate Example from sklearn.linear_model import LinearRegression Model predict sales based on ad spend X=ad_spend y=sales model.fit(X y) prediction=model.predict([[4000]]) 37000.'},
      {title: 'Capstone Project 1 - Sales Analysis', content: 'Capstone Sales Analysis Dataset Superstore or your sales Tasks Load CSV Clean missing duplicates Analyze total sales per city month Best product Correlation ad spend sales Visualize 3 charts bar line scatter Insights Recommendation. Present Jupyter notebook.'},
      {title: 'Capstone Project 2 - AI Chatbot', content: 'Capstone Build simple chatbot Rule-based If user says hello bot responds Hi! How can I help? Or Use ChatterBot library Train on Kpata Academy FAQs. Example Questions What is data analytics? Answer data analytics is... Deploy Streamlit.'},
      {title: 'Final - Portfolio & Next Steps', content: 'Portfolio GitHub repository Jupyter notebooks README Projects Sales analysis Chatbot Publish Streamlit ShareX Deploy Vercel Next steps Learn Advanced Python Django Flask FastAPI for backend TensorFlow PyTorch for deep learning Contribute open source. Completes Python for Data & AI certificate Ready for data analyst Python developer.'}
    ])
  }
]

// --- REQUIRED EXPORTS FOR BUILD - DO NOT REMOVE ---
export function getCourse(slug: string){
  if(!slug) return null
  const s = slug.toString().toLowerCase().trim()
  // Exact match first
  let found = COURSES.find(c => c.slug.toLowerCase() === s)
  if(found) return found
  // Safe slug match
  found = COURSES.find(c => c.slug.toLowerCase().replace(/[^a-z0-9]/g,'') === s.replace(/[^a-z0-9]/g,''))
  if(found) return found
  // Includes match
  found = COURSES.find(c => c.slug.toLowerCase().includes(s) || s.includes(c.slug.toLowerCase()))
  return found || null
}

export function getAllCourses(){
  return COURSES
}

export function getAllCourseSlugs(){
  return COURSES.map(c => c.slug)
}

export function getCourseBySlug(slug: string){
  return getCourse(slug)
}

export function getLessons(slug: string){
  const course = getCourse(slug)
  return course?.lessons || []
}

export function getLesson(courseSlug: string, lessonId: string | number){
  const course = getCourse(courseSlug)
  if(!course) return null
  const nid = String(lessonId).toLowerCase().trim()
  let lesson = course.lessons.find(l => String(l.id).toLowerCase() === nid)
  if(lesson) return lesson
  const num = parseInt(String(lessonId))
  if(!isNaN(num) && num>=1 && num<=course.lessons.length) return course.lessons[num-1]
  if(!isNaN(num) && num>=0 && num<course.lessons.length) return course.lessons[num]
  // Fallback first
  return course.lessons[0] || null
}
