// FULL ROBUST COURSES - All lessons with real content - FIXED EXPORTS
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
  lessons: Lesson[]
}

export const COURSES: Course[] = [
  {
    slug: 'google-data-analytics',
    title: 'Google Data Analytics',
    description: 'Complete Google Data Analytics Certification - From beginner to job-ready analyst',
    lessons: [
      {
        id: 1,
        title: 'Data Analytics Lesson 1 - Introduction to Data Analytics',
        type: 'Theory',
        duration: '20 mins',
        content: `MAIN LESSON: Introduction to Data Analytics - Simple English

What is Data Analytics?
Data Analytics is the process of collecting, cleaning, analyzing data to find useful information to make better business decisions.

Example: A shop owner in Minna wants to know which product sells most. He looks at his sales book - that is data analytics!

6 Steps of Data Analysis Process:
1. ASK - Define the problem and question
2. PREPARE - Collect data from sources
3. PROCESS - Clean the data (remove errors)
4. ANALYZE - Find patterns
5. SHARE - Present with charts
6. ACT - Make decision

Types of Data:
- Quantitative: Numbers (Age 25, Sales N5000)
- Qualitative: Words (Customer happy, Color red)

Career Path: Junior Data Analyst -> Data Analyst -> Senior Analyst -> Data Scientist

Tools: Spreadsheets (Excel/Google Sheets), SQL, R, Tableau`,
        workedExample: `WORKED EXAMPLE 1 - Step by Step

Scenario: Kpata Shop wants to know best selling day.

Data: Monday: 5 sales, Tuesday: 20 sales, Wednesday: 7 sales

Q: What is best day?
A: Step 1 ASK: Which day has highest sales?
Step 2 PREPARE: Sales data Mon-Wed
Step 3 PROCESS: Check data is correct
Step 4 ANALYZE: Tuesday 20 > Monday 5, Wednesday 7
Step 5 SHARE: Create bar chart - Tuesday bar tallest
Step 6 ACT: Open shop longer on Tuesday, do promo

Result: Data-driven decision, not guess!`,
        workedExample2: `WORKED EXAMPLE 2 - Second Scenario

Scenario: Restaurant wants to reduce food waste.

Data: Collected food waste per day: Rice 5kg waste, Beans 1kg waste

Analysis: Rice wasted more.

Action: Cook less rice, more beans. Save money.

This is analytics in real life!`,
        sampleLab: `LAB QUESTION: Think of a business in your area (e.g., barbing salon). List 3 questions you can ASK about their business that data can answer. Example: What time do most customers come? Write your 3 questions and why they matter.`,
        tryYourself: `Try Yourself: List 5 examples of quantitative and 5 qualitative data from your daily life.`,
        examTips: `Exam Tips: Google asks definition of 6 phases. Memorize ASK, PREPARE, PROCESS, ANALYZE, SHARE, ACT in order.`,
        cheatsheet: `Cheatsheet: Data Analytics = Collect + Clean + Analyze + Decide. 6 Steps: Ask Prepare Process Analyze Share Act.`,
        quiz: `Quiz: 1. What is first step of data analysis? 2. Difference between quantitative and qualitative?`,
        finalProject: `Homework: Interview one small business owner. Ask them one business question. Write how data can help answer it. Must explain 6 steps for that business.`
      },
      {
        id: 2,
        title: 'Data Analytics Lesson 2 - Spreadsheets & Data Cleaning',
        type: 'Practical',
        duration: '15 mins',
        content: `MAIN LESSON: Data 2 - Spreadsheets & Data Cleaning

What is a Spreadsheet?
Grid of rows and columns like Excel. Each box is a cell.

Important Terms:
- Formula: =SUM(A1:A10) adds numbers
- Function: Pre-built formula e.g., AVERAGE
- VLOOKUP: Find value in table
- Pivot Table: Summarize large data quickly

Data Cleaning - Why?
Real data is dirty! Examples: Missing name, Wrong date format 12/13/2023, Duplicate customer twice, Spelling "Lagos" vs "lagos"

How to Clean:
1. Remove duplicates: Data > Remove Duplicates
2. Fix spelling: Find & Replace
3. Handle blanks: Fill with N/A or 0 or delete
4. Change format: Text to Date, Number to Currency
5. Trim spaces: =TRIM(A1)

Link for Practice: https://docs.google.com/spreadsheets or Sample_Sales_Data.csv

Rule: Clean data = Accurate analysis. Dirty data = Wrong decisions!`,
        workedExample: `WORKED EXAMPLE: Cleaning Sales Data

Raw Data:
Name | Sales | Date
John |  500 | 2024-13-01 (invalid month 13)
john |  500 | 2024-01-10 (duplicate + lowercase)
Mary |  (blank)

Cleaning Steps:
1. Date 2024-13-01 -> Error, change to 2024-01-13 after checking receipt
2. john duplicate -> Remove duplicate, keep John capitalized
3. Mary blank sales -> Check if she made sale, if not put 0
4. Use =TRIM to remove spaces

Result: Clean table ready for analysis.

Link: https://lookerstudio.google.com or /Sample_Sales_Data.csv`,
        workedExample2: `SCENARIO 2: Student scores

Data: Names with scores: Musa 90, Musa 90 (duplicate), Musa  (blank), musa 70

Cleaning:
- Remove duplicate 90
- Capitalize musa to Musa
- Blank -> Ask teacher for correct score

Clean data helps fair ranking!`,
        sampleLab: `LAB: Open Google Sheets. Create table: Product, Qty, Price. Add 10 rows with 2 intentional duplicates and 1 blank. Use Remove Duplicates and fill blank. Screenshot your cleaned sheet. Link practice: https://docs.google.com/spreadsheets`,
        tryYourself: `Try: Use functions =SUM, =AVERAGE, =MAX, =MIN on your sales data.`,
        examTips: `Exam: Know how to use VLOOKUP, Remove Duplicates, Text to Columns.`,
        cheatsheet: `Formulas: SUM, AVERAGE, COUNT, IF, VLOOKUP. Cleaning: Duplicates, Blanks, Trim, Format.`,
        quiz: `Quiz: What function removes extra spaces? Answer: TRIM. What tool summarizes data fast? Pivot Table.`,
        finalProject: `Homework: Download sample sales CSV from Kaggle. Clean it fully: duplicates, blanks, formats. Submit before/after screenshot.`
      },
      {
        id: 3,
        title: 'Data Analytics Lesson 3 - SQL Basics',
        type: 'Practical',
        duration: '25 mins',
        content: `MAIN LESSON: SQL - Language for Databases

What is SQL? Structured Query Language. Used to talk to databases where large data lives (not Excel).

Why SQL? Excel can handle 1 million rows max. SQL handles billions! Companies store data in SQL databases.

Basic SQL Commands:
SELECT - Choose columns: SELECT name, age FROM customers
FROM - Which table: FROM customers
WHERE - Filter rows: WHERE age > 25
ORDER BY - Sort: ORDER BY sales DESC
GROUP BY - Group same values: GROUP BY city
JOIN - Combine two tables

Example Database: Customers Table
ID | Name | City | Sales
1 | Musa | Minna | 5000
2 | Aisha | Abuja | 7000

Query: SELECT Name FROM Customers WHERE City='Minna' -> Returns Musa`,
        workedExample: `STEP-BY-STEP SQL Query

Task: Find total sales per city from Sales Table.

Table: Sales
City | Amount
Minna | 5000
Abuja | 7000
Minna | 3000

Query:
SELECT City, SUM(Amount) AS TotalSales
FROM Sales
GROUP BY City

Result:
Minna | 8000
Abuja | 7000

Explanation: GROUP BY groups Minna together, SUM adds 5000+3000=8000`,
        workedExample2: `SCENARIO 2: Join

Customers Table + Orders Table

Customers: ID, Name
Orders: OrderID, CustomerID, Amount

Want Name + Amount:

SELECT Customers.Name, Orders.Amount
FROM Customers
JOIN Orders ON Customers.ID = Orders.CustomerID

This combines data from two tables using common ID.`,
        sampleLab: `LAB: Go to https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all
Practice:
1. SELECT * FROM Customers
2. SELECT City FROM Customers WHERE Country='Nigeria'
3. SELECT COUNT(*) FROM Customers
Submit your 3 queries and results.`,
        tryYourself: `Try: Write query to find all customers from Minna with sales > 5000.`,
        examTips: `Memorize SELECT, FROM, WHERE, GROUP BY, ORDER BY, JOIN order. Google loves GROUP BY vs ORDER BY difference.`,
        cheatsheet: `SQL Order: SELECT -> FROM -> WHERE -> GROUP BY -> ORDER BY. JOIN combines tables.`,
        quiz: `Quiz: Which clause filters after grouping? Answer: HAVING (not WHERE).`,
        finalProject: `Homework: Create 2 tables (Students, Grades) with 5 rows each. Write 3 queries: 1 SELECT WHERE, 1 GROUP BY SUM, 1 JOIN.`
      },
      {
        id: 4,
        title: 'Data Analytics Lesson 4 - Data Visualization with Tableau/Looker Studio',
        type: 'Practical',
        duration: '20 mins',
        content: `MAIN LESSON: Visualization - Making Data Beautiful & Understandable

Why Visualize? Human brain understands pictures faster than tables. A chart can show trend in 2 seconds that table needs 2 minutes.

Types of Charts & When to Use:
- Bar Chart: Compare categories (Sales by City)
- Line Chart: Show trend over time (Sales Jan-Dec)
- Pie Chart: Show parts of whole (Market share %)
- Scatter Plot: Show relationship (Age vs Spending)
- Map: Location data (Sales by State)

Principles:
- Keep simple, no 3D effects
- Label axes clearly
- Use color meaningfully (red = loss, green = profit)
- One chart = One message

Tools: Tableau Public (free), Looker Studio (Google, free, link: https://lookerstudio.google.com), Power BI

Steps: Connect data -> Drag fields -> Choose chart type -> Customize -> Share link`,
        workedExample: `WORKED EXAMPLE: Sales Dashboard

Data: Monthly sales Jan: 10k, Feb: 15k, Mar: 8k

Goal: Show sales trend

Steps in Looker Studio:
1. Go to lookerstudio.google.com -> Blank Report
2. Add Data: Google Sheets with monthly sales
3. Add Chart -> Line Chart
4. Dimension: Month, Metric: Sales
5. Result: Line going up then down - shows Feb best month

Insight: Promote more in February next year!

Link: https://lookerstudio.google.com`,
        workedExample2: `SCENARIO 2: Which product sells most?

Data: Product A 50 sales, Product B 30, Product C 100

Best Chart: Bar Chart - Product C bar tallest instantly visible.

If use Pie: C takes 55% of pie.

Choose bar for comparison, pie for percentage.`,
        sampleLab: `LAB: Use Looker Studio https://lookerstudio.google.com
Import sample data: https://docs.google.com/spreadsheets/d/1sample (or your sales data). Create 2 charts: 1 Bar chart Sales by Product, 1 Line chart Sales over Time. Share view link.`,
        tryYourself: `Try: Create dashboard with 3 charts for same dataset. Which tells best story?`,
        examTips: `Know which chart for which data: Trend=Line, Comparison=Bar, Composition=Pie, Relationship=Scatter.`,
        cheatsheet: `Bar=Compare, Line=Trend over time, Pie=% of whole, Scatter=relationship, Map=location.`,
        quiz: `Quiz: Sales by region - best chart? Bar or Map. Sales over 12 months - best? Line.`,
        finalProject: `Homework: Build full dashboard: Title, 3 charts (bar, line, pie), 1 filter. Topic: Your shop sales or student scores. Submit screenshot + insights (2 sentences).`
      },
      {
        id: 5,
        title: 'Data Analytics Lesson 5 - R Programming Basics',
        type: 'Practical',
        duration: '25 mins',
        content: `MAIN LESSON: R Programming for Analysts

What is R? Programming language for statistics and data analysis. Free. Used for complex analysis Excel cannot do.

Why R? Powerful for statistics, many free packages, great charts, used by Google analysts.

Basics:
- Install: https://cran.r-project.org + RStudio
- Variable: x <- 5 (assign 5 to x)
- Vector (list): scores <- c(90, 80, 70)
- Data Frame (table): data.frame(name=c("Musa","Aisha"), age=c(25,30))
- Function: mean(scores) gives average 80
- Install package: install.packages("ggplot2")
- Load package: library(ggplot2)

Common functions:
mean() average, sum() total, sd() standard deviation, head() first rows, summary() stats`,
        workedExample: `STEP-BY-STEP R Example

Task: Analyze student scores

Code in RStudio:
scores <- c(85, 90, 78, 92, 88)
mean(scores) # Result 86.6 average
max(scores) # 92 highest
min(scores) # 78 lowest
sort(scores) # 78 85 88 90 92

Create data frame:
students <- data.frame(
  name = c("Musa","Aisha","John"),
  score = c(85,90,78)
)
print(students)

Chart:
library(ggplot2)
ggplot(students, aes(x=name, y=score)) + geom_bar(stat="identity")

Result: Bar chart of scores`,
        workedExample2: `SCENARIO 2: Clean with R

Data with NA (blank):
scores <- c(90, NA, 85)

mean(scores, na.rm=TRUE) # Removes NA, calculates 87.5

Filter:
subset(students, score > 80) # Only students above 80`,
        sampleLab: `LAB: Install R & RStudio. Run:
x <- c(10,20,30,40,50)
mean(x)
sum(x)
Create data.frame with your 5 friends names and ages. Use summary().
Submit code + output screenshot.`,
        tryYourself: `Try: Create vector of 10 sales numbers. Find mean, median, sd.`,
        examTips: `R basics: <- for assignment, c() for vector, data.frame() for table, mean(), library().`,
        cheatsheet: `x <- 5, c(1,2,3), data.frame(), mean(), sum(), library(package), install.packages()`,
        quiz: `Quiz: How to assign in R? Answer: <- . Function for average? mean().`,
        finalProject: `Homework: Dataset of 20 sales values. In R, calculate mean, max, min, sd, and create bar chart with ggplot2.`
      },
      {
        id: 6,
        title: 'Data Analytics Lesson 6 - Ask, Prepare, Process',
        type: 'Theory',
        duration: '20 mins',
        content: `DEEP DIVE: First 3 Phases

1. ASK Phase:
Define problem, stakeholders (who cares), questions. SMART questions: Specific, Measurable, Action-oriented, Relevant, Time-bound.
Bad: "How are sales?" Good: "What was sales increase for Product A in Minna last 30 days?"
Identify data needed, not assumptions.

2. PREPARE Phase:
Where is data? Internal (company database) vs External (government, Kaggle). Check data credibility: ROCCC - Reliable, Original, Comprehensive, Current, Cited.
Data types: First-party (you collected), Second-party (partner), Third-party (bought).
Bias check: Selection bias (only surveying happy customers), Observer bias.

3. PROCESS Phase:
Cleaning in detail: Manual vs automated. Tools: Spreadsheets, SQL, R, Python.
Checklist: Duplicates, blanks, outliers (e.g., age 200), inconsistent formatting, misspellings.
Documentation: Keep log of cleaning steps (Data lineage).

Real example: Hospital data - ASK: Why patients wait long? PREPARE: Collect check-in/out times, staff numbers. PROCESS: Remove test entries, fix time formats.`,
        workedExample: `EXAMPLE: Ask Phase Done Well

Business: Kpata Academy

Stakeholder: CEO Godwin

Bad Question: "Is academy doing well?"
SMART Question: "What is completion rate for Google Data Analytics course among students in Minna in last 90 days, and what lessons have lowest completion?"

Why better? Specific (completion rate), Measurable (%), Action-oriented (find low lessons), Relevant (CEO cares), Time-bound (90 days).

Then PREPARE: Data from platform database, student progress table. Check if data current, reliable.`,
        workedExample2: `PROCESS Example

Data: Student ages: 22, 25, 999, 23

999 is outlier (error). How to handle? Check source, if typo 99? Or remove? Document decision: "Removed 999 as data entry error per ROCCC check - not reliable".

This shows professional cleaning.`,
        sampleLab: `LAB: Choose a topic (e.g., food delivery). Write 1 Bad question and 1 SMART question. List 2 data sources you would PREPARE and how to check ROCCC. Then list 3 PROCESS cleaning steps you anticipate.`,
        tryYourself: `Try: Find a dataset on Kaggle. Evaluate ROCCC for it.`,
        examTips: `Exam loves SMART and ROCCC. Memorize letters!`,
        cheatsheet: `ASK=SMART, PREPARE=ROCCC + Data types, PROCESS=Cleaning checklist`,
        quiz: `What does ROCCC stand for? Reliable Original Comprehensive Current Cited.`,
        finalProject: `Homework: Full Ask-Prepare-Process report for "Why Kpata Academy students drop off". 300 words.`
      },
      {
        id: 7,
        title: 'Data Analytics Lesson 7 - Analyze & Share',
        type: 'Theory + Practical',
        duration: '25 mins',
        content: `DEEP DIVE: Last 3 Phases

4. ANALYZE Phase:
Tools: Spreadsheets (pivot), SQL (group by), R (statistics), Tableau (visual).
Methods: Correlation (does A go with B?), Sorting, Filtering, Calculating mean/median/mode.
Data storytelling: Find insight, not just numbers. Insight = "Sales drop 20% on Mondays because shop closes early"

5. SHARE Phase:
Who is audience? CEO wants high-level, team wants detail.
Visualization: Use right chart, tell story.
Presentation: Start with question, show analysis, end with recommendation.
McCandless Method: Introduction, Insight, Impact.

6. ACT Phase:
Put insight into action. Implement recommendation, measure result. Data-driven decision.

Also: Data Ethics, Privacy, Consent, Anonymization.

Google Data Analytics Certificate Exam covers all 6 phases heavily.`,
        workedExample: `ANALYZE Example

Data: Sales vs Advertising spend
Month | Ad Spend | Sales
Jan | 1000 | 10000
Feb | 2000 | 20000
Mar | 3000 | 28000

Analysis: As Ad Spend increases, Sales increases -> Positive correlation. Calculate: For every 1000 ad, sales increase ~9000.

Share: Line chart showing both lines going up together.

Act: Recommendation: Increase ad spend to 4000 next month, expect sales ~37000.

This is full Analyze-Share-Act.`,
        workedExample2: `SHARE Example

Bad Share: "Sales is 10000, 20000, 28000" (just numbers)

Good Share: "Sales grew 180% from Jan to Mar, strongly correlated with ad spend. Recommendation: Increase ad budget by 33% to maximize profit. See chart."

CEO understands impact quickly.`,
        sampleLab: `LAB: Take previous sales data. Calculate correlation manually or in Sheets =CORREL(). Create 1 chart. Write 3-bullet Share story: Insight, Evidence, Recommendation.`,
        tryYourself: `Try: Analyze your own phone usage data (screen time per day). Find pattern, share insight.`,
        examTips: `Analyze tools: Pivot, SQL, R. Share: Audience matters, chart choice matters.`,
        cheatsheet: `Analyze=Correlation, calc, pivot. Share=Audience+Chart+Story. Act=Decision.`,
        quiz: `Quiz: What phase presents findings? Share. What phase implements decision? Act.`,
        finalProject: `Homework: Full case study: Analyze Kpata Academy lesson completion data (make sample 20 rows). Show Analyze (calculations), Share (chart description), Act (recommendation).`
      },
      {
        id: 8,
        title: 'Data Analytics Lesson 8 - Capstone Project - Case Study',
        type: 'Project',
        duration: '60 mins',
        content: `CAPSTONE: Put Everything Together - Real Job Interview Project

Scenario: You are Junior Data Analyst at Bellabeat (Google case study example) or Kpata Shop.

Task: Complete full 6 phases for one business question.

Bellabeat Case Study (Google's actual case study):
Bellabeat makes wellness products. Question: How can Bellabeat smart devices trends inform marketing?

Your Job:
1. ASK: Define business task - Analyze FitBit fitness data to find usage trends
2. PREPARE: Dataset - FitBit Daily Activity (30 days, 33 users) from Kaggle
3. PROCESS: Clean - Remove 0 steps (device not worn), fix dates, remove duplicates
4. ANALYZE: Calculate avg steps, active minutes, find correlation between steps and calories, find which day most active
5. SHARE: Create 3 visualizations: Avg steps per weekday (bar), Steps vs Calories (scatter), Daily active minutes trend (line). Write insights.
6. ACT: Recommend marketing campaign targeting most active day, feature for low-activity users.

Deliverables for Certificate: Presentation (slides) + Documentation.

This is what employers will ask in interview!`,
        workedExample: `WORKED CAPSTONE SNIPPET

Ask: "What are trends in smart device usage?"

Prepare: Source - FitBit Fitness Tracker Data from Kaggle, 30 users, reliable? Yes, original from FitBit, current (2023).

Process: Found 100 rows with 0 steps - removed as device not worn (documented).

Analyze:
- Average steps: 7500
- Most active: Tuesday & Saturday
- Correlation steps-calories: 0.7 strong positive
- 30% users use device <10 days (low engagement)

Share:
Chart 1: Bar - Steps by weekday - Tue/Sat highest
Insight: People more active mid-week and weekend
Recommendation: Push notifications on Tue/Sat

Act: Recommend Bellabeat app send motivational message on low-activity days.

This gets you certificate!`,
        workedExample2: `KPATA SHOP VERSION

Same 6 phases for Kpata Academy:

Question: Which lessons have lowest completion?

Data: Student progress table

Finding: Lesson 2 and 5 have 40% drop.

Recommendation: Add more examples to lesson 2, add video to lesson 5.

Action: Update lessons, re-measure completion after 30 days.

This shows you can apply to your own business.`,
        sampleLab: `FINAL LAB - YOUR CAPSTONE:

Choose ONE dataset:
- FitBit (Kaggle)
- Your own Kpata Academy progress (make 30 rows)
- Sample Superstore Sales

Do full 6 phases report:
- 1 page Ask
- 1 page Prepare (ROCCC)
- 1 page Process (cleaning log)
- 2 pages Analyze (2 calculations + insights)
- 2 pages Share (describe 2 charts you would make + story)
- 1 page Act (recommendation)

Submit as Google Doc link. This is your portfolio piece for job!`,
        tryYourself: `Try: Present your capstone to friend in 5 minutes. Can they understand your recommendation?`,
        examTips: `Google Certificate Final: Case Study is mandatory. Follow 6 phases structure exactly. Use Bellabeat example as template.`,
        cheatsheet: `Capstone Template: Ask (business task), Prepare (source + ROCCC), Process (cleaning), Analyze (2 insights), Share (charts), Act (recommendation).`,
        quiz: `Quiz: Capstone must have how many phases? 6. Must include visualizations? Yes minimum 2-3.`,
        finalProject: `FINAL PROJECT: Submit full capstone Google Slides (6 slides) + 1 dashboard link (Looker Studio). Must score 80% from Kpata Bot evaluation to complete certification. Congratulations! You are now job-ready Junior Data Analyst!`
      },
      { id: 9, title: 'Data Analytics Lesson 9 - Spreadsheets Advanced', type: 'Practical', duration: '30 mins', content: 'Advanced spreadsheets: Pivot tables deep dive, Advanced formulas: INDEX-MATCH better than VLOOKUP, ARRAYFORMULA, QUERY function, Data validation, Conditional formatting. Create interactive dashboard in Sheets using slicers.', workedExample: 'Pivot: Rows=Product, Values=SUM(Sales). Instantly see total per product.', workedExample2: 'INDEX-MATCH: =INDEX(return_col, MATCH(lookup_val, lookup_col,0)) - no column count issue like VLOOKUP.', sampleLab: 'Build pivot table from 100 rows sales data, group by month.', tryYourself: 'Use QUERY: =QUERY(A1:D100, "select B, sum(C) where D>100 group by B")', examTips: 'Pivot tables are exam heavy.', cheatsheet: 'Pivot: Drag fields. INDEX-MATCH > VLOOKUP.', quiz: 'Function to sum with condition? SUMIF', finalProject: 'Interactive dashboard in Sheets with pivot + slicer.' },
      { id: 10, title: 'Data Analytics Lesson 10 - SQL Advanced', type: 'Practical', duration: '30 mins', content: 'Advanced SQL: Subqueries (query inside query), CTEs (WITH clause), Window functions ROW_NUMBER(), RANK(), CASE statements, Data types, Temporary tables, Cleaning with SQL: TRIM, CAST, COALESCE for nulls, Handling duplicates with ROW_NUMBER() partition.', workedExample: 'Subquery: SELECT * FROM (SELECT City, SUM(Sales) as total FROM Sales GROUP BY City) WHERE total>10000', workedExample2: 'Window: SELECT Name, Sales, RANK() OVER (ORDER BY Sales DESC) as rank FROM Sales', sampleLab: 'Practice window functions on W3Schools.', tryYourself: 'Use CASE: SELECT Name, CASE WHEN Sales>10000 THEN "High" ELSE "Low" END', examTips: 'Window functions are advanced but tested.', cheatsheet: 'Subquery, CTE WITH, Window RANK(), CASE WHEN', quiz: 'What is CTE?', finalProject: 'Write 5 advanced queries: subquery, CTE, window, CASE, cleaning.' },
      { id: 11, title: 'Data Analytics Lesson 11 - R Advanced & Visualization', type: 'Practical', duration: '35 mins', content: 'R advanced: dplyr package for data manipulation: filter(), select(), mutate(), arrange(), group_by() + summarise(). ggplot2 advanced: aes, geom_point, geom_line, facets, themes. Tidyverse. Import CSV: read.csv(). Export. Handling factors. Real project: Analyze COVID data.', workedExample: 'dplyr: library(dplyr); data %>% filter(city=="Minna") %>% group_by(product) %>% summarise(total=sum(sales))', workedExample2: 'ggplot2 advanced: ggplot(data, aes(x=sales, y=profit, color=city)) + geom_point() + facet_wrap(~year)', sampleLab: 'Use dplyr to clean and summarize FitBit data.', tryYourself: 'Install tidyverse and practice pipe %>%', examTips: 'dplyr verbs: filter, select, mutate, arrange, group_by, summarise.', cheatsheet: 'dplyr + ggplot2 = 90% of R work.', quiz: 'Pipe operator? %>% or |>', finalProject: 'Full R analysis: Import CSV, clean with dplyr, visualize with ggplot2, 3 charts.' },
      { id: 12, title: 'Data Analytics Lesson 12 - Tableau Deep Dive', type: 'Practical', duration: '30 mins', content: 'Tableau: Connect to data, Dimensions vs Measures, Marks card, Filters, Parameters, Calculated fields, Joins and Blends, Dashboards and Stories, Publishing to Tableau Public. Best practices: Keep dashboard under 3 views, use filters, tell story.', workedExample: 'Calculated field: Profit Margin = SUM([Profit])/SUM([Sales]). Add to view.', workedExample2: 'Dashboard: Combine bar + map + KPI in one dashboard with filter by year.', sampleLab: 'Tableau Public: Create dashboard with Superstore dataset.', tryYourself: 'Create parameter to switch between Sales and Profit.', examTips: 'Tableau: Dimensions=qualitative, Measures=quantitative.', cheatsheet: 'Dimensions vs Measures, Calculated field, Dashboard.', quiz: 'Difference dimension vs measure?', finalProject: 'Publish Tableau dashboard to public profile - link for portfolio.' },
      { id: 13, title: 'Data Analytics Lesson 13 - Data Ethics & Privacy', type: 'Theory', duration: '20 mins', content: 'Ethics: Informed consent, Anonymization (remove PII), Data bias (historical bias, sampling bias), Fairness, Privacy laws: GDPR (EU), NDPR (Nigeria Data Protection Regulation). De-identification, k-anonymity. Responsible AI. Case studies: Bias in hiring algorithms. As analyst, you must protect privacy.', workedExample: 'Anonymization: Replace names with ID 1,2,3. Remove phone numbers before sharing analysis.', workedExample2: 'Bias: If train hiring model only on male resumes, it will discriminate. Need diverse data.', sampleLab: 'Review a dataset for PII. List fields to anonymize before sharing.', tryYourself: 'What is NDPR? Nigeria Data Protection Regulation.', examTips: 'Ethics questions appear in Google cert.', cheatsheet: 'Consent, Anonymize, Bias check, GDPR/NDPR.', quiz: 'What is PII?', finalProject: 'Write data ethics checklist for your capstone project.' },
      { id: 14, title: 'Data Analytics Lesson 14 - Job Preparation', type: 'Career', duration: '30 mins', content: 'Resume: Highlight tools: SQL, Sheets, Tableau, R. Projects: Capstone + 2 more. Portfolio: GitHub or website with dashboards links. LinkedIn optimization. Interview: STAR method (Situation Task Action Result) for behavioral questions. Technical interview: SQL query whiteboard, case study. Salary negotiation. Apply: LinkedIn, Indeed, local companies.', workedExample: 'Resume bullet: "Analyzed sales data of 10k rows using SQL and Tableau, identified 15% growth opportunity, presented to management, led to N500k increased sales"', workedExample2: 'STAR: Q: Tell time you handled difficult data. S: Data was messy sales. T: Need clean in 2 days. A: Used SQL to clean duplicates. R: Delivered on time, analysis accurate.', sampleLab: 'Create 1-page resume for Junior Data Analyst using your capstone.', tryYourself: 'Practice STAR stories for 3 common questions.', examTips: 'Portfolio > Certificate alone. Show projects.', cheatsheet: 'Resume = Tools + Projects + Impact with numbers. STAR for interviews.', quiz: 'What is STAR?', finalProject: 'Complete portfolio: Resume + LinkedIn + 2 dashboards links.' },
      { id: 15, title: 'Data Analytics Lesson 15 - Final Exam & Certification', type: 'Exam', duration: '60 mins', content: 'Final preparation: Review all 6 phases, SQL (SELECT WHERE GROUP BY), Spreadsheets (VLOOKUP, Pivot), R (mean, data.frame), Visualization (chart choice), Ethics, Capstone structure. Google Data Analytics Certificate exam: 8 courses, each course has quizzes + final. Must pass all to get certificate on Coursera. After certificate, add to LinkedIn, share. Next steps: Learn Python, Advanced SQL, Power BI. Keep practicing on Kaggle datasets. Congratulations!', workedExample: 'Practice Exam: 1. What is first phase? ASK. 2. SQL to find sum? SELECT SUM(). 3. Best chart for trend? Line. 4. How to remove duplicates in Sheets? Data > Remove duplicates.', workedExample2: 'Next learning path: Google Advanced Data Analytics or IBM Data Science.', sampleLab: 'Take Google practice quiz: https://www.coursera.org/professional-certificates/google-data-analytics', tryYourself: 'Mock interview: Explain your capstone in 3 minutes.', examTips: 'Final exam: Focus on 6 phases, SQL basics, chart choice, cleaning.', cheatsheet: '6 Phases + SQL + Sheets + R + Visualization + Ethics = Certificate', quiz: 'Full mock quiz of 10 questions covering all topics.', finalProject: 'FINAL: Submit all: Capstone slides + 2 dashboards + Resume. Score 80% to earn Kpata Academy Certificate for Google Data Analytics. Share on LinkedIn and tag Kpata Academy!' }
    ]
  },
  {
    slug: 'google-project-management',
    title: 'Google Project Management',
    description: 'Google Project Management Certificate - Lead projects',
    lessons: [
      { id: 1, title: 'Lesson 1 - Foundations of Project Management', type: 'Theory', duration: '20 mins', content: 'MAIN LESSON: What is a Project? Temporary effort to create unique product. Project vs Operations: Project temporary, operations ongoing. Triple Constraint: Scope, Time, Cost - change one affects others. Role of Project Manager: Plan, organize, lead. Methodologies: Waterfall (sequential) vs Agile (iterative). Example: Building Kpata Academy is project.', workedExample: 'Example: Building a house - Scope: 3 bedrooms, Time: 6 months, Cost: N10m. If add 1 bedroom, time/cost increase.', workedExample2: 'Example: Wedding planning is project - has deadline, budget, unique.', sampleLab: 'LAB: Define a project in your life (e.g., birthday party) with Scope, Time, Cost.', tryYourself: 'List 3 projects vs 3 operations.', examTips: 'Triple constraint is key exam topic.', cheatsheet: 'Project = Temporary + Unique. Triple: Scope Time Cost.', quiz: 'What is triple constraint?', finalProject: 'Write project charter for small project.' },
      { id: 2, title: 'Lesson 2 - Project Initiation & Charter', type: 'Theory', duration: '20 mins', content: 'Initiation: First phase. Identify stakeholders, define goals, create Project Charter document. Charter includes: Project purpose, objectives, stakeholders, scope, risks, budget high-level. Stakeholder analysis: Power/Interest grid. Example charter for Kpata Academy.', workedExample: 'Charter Example: Project: Kpata Academy Platform. Purpose: Provide free tech education. Objectives: 1000 students in 6 months. Stakeholders: CEO, Students, Developers.', workedExample2: 'Stakeholder grid: CEO High Power High Interest -> Manage closely. Students Low Power High Interest -> Keep informed.', sampleLab: 'Create Project Charter for your own project (1 page).', tryYourself: 'Identify stakeholders for building school.', examTips: 'Charter is first document, signed by sponsor.', cheatsheet: 'Charter = Purpose + Objectives + Stakeholders + Scope + Risks.', quiz: 'When is charter created? Initiation.', finalProject: 'Full charter for app development project.' },
      { id: 3, title: 'Lesson 3 - Planning - Scope, Schedule, Budget', type: 'Practical', duration: '25 mins', content: 'Planning: WBS (Work Breakdown Structure) - Break project into small tasks. Example: Build website = Design, Frontend, Backend, Test. Schedule: Gantt chart shows tasks over time, dependencies (Task B cannot start before A). Budget: Estimate costs bottom-up (each task cost sum). Tools: Asana, Jira, Sheets, Gantt.', workedExample: 'WBS for Data Analytics Course: 1. Create lessons 2. Create labs 3. Record videos 4. Build platform. Each broken further: 1.1 Write content 1.2 Review.', workedExample2: 'Gantt: Lesson creation Week 1-2, Platform Week 2-3, Test Week 4. Dependency: Test after Platform.', sampleLab: 'Create WBS for event planning (at least 12 tasks) and Gantt in Sheets.', tryYourself: 'Estimate budget for your project.', examTips: 'WBS 100% rule - sum of children = 100% of parent.', cheatsheet: 'WBS = Decompose. Gantt = Timeline + Dependencies. Budget = Bottom-up.', quiz: 'What is WBS?', finalProject: 'Full project plan: WBS + Gantt + Budget.' },
      { id: 4, title: 'Lesson 4 - Agile & Scrum', type: 'Theory', duration: '20 mins', content: 'Agile: Iterative, flexible, customer feedback. Values: Individuals over processes, Working software over docs, Customer collaboration, Responding to change. Scrum: Framework. Roles: Product Owner (what), Scrum Master (process), Dev Team (build). Events: Sprint (2 weeks), Daily Standup (15 min), Sprint Review, Retrospective. Artifacts: Product Backlog, Sprint Backlog, Increment.', workedExample: 'Scrum for Kpata: Product Backlog: All lessons. Sprint 1: Build Lesson 1-2. Daily standup: What did yesterday? Today? Blockers?', workedExample2: 'Kanban board: To Do, In Progress, Done. Move tasks across.', sampleLab: 'Run 1-week sprint for your personal project using Trello board.', tryYourself: 'Write 5 user stories: As a student, I want ... so that ...', examTips: 'Scrum roles and events heavily tested.', cheatsheet: 'Agile = Iterative. Scrum = PO, SM, Dev Team. Sprint 2 weeks.', quiz: 'What is sprint?', finalProject: 'Create Product Backlog with 10 user stories + 1 Sprint plan.' },
      { id: 5, title: 'Lesson 5 - Execution & Team Management', type: 'Theory', duration: '20 mins', content: 'Execution: Doing the work. Leadership styles: Authoritarian vs Democratic. Team development: Forming, Storming, Norming, Performing, Adjourning. Communication: 80% of PM job! Manage conflicts, motivate. RACI chart: Responsible, Accountable, Consulted, Informed for each task.', workedExample: 'RACI for Lesson creation: Writer Responsible, CEO Accountable, Students Consulted, Marketing Informed.', workedExample2: 'Conflict: Developer vs Designer disagreement on UI. Resolve: Focus on project goal, not personal.', sampleLab: 'Create RACI for your project team (3 people).', tryYourself: 'Which leadership style when team is new? Authoritarian more directive.', examTips: 'Tuckman 5 stages of team development.', cheatsheet: 'Forming Storming Norming Performing Adjourning. RACI.', quiz: 'What is RACI?', finalProject: 'Team management plan with communication plan.' },
      { id: 6, title: 'Lesson 6 - Monitoring, Risk & Closing', type: 'Theory', duration: '25 mins', content: 'Monitoring: Track progress vs plan. Earned Value Management (EVM): PV Planned Value, EV Earned Value, AC Actual Cost. SPI Schedule Performance, CPI Cost Performance. If SPI <1 behind schedule, CPI <1 over budget. Risk: Identify, Assess (Probability x Impact), Mitigate, Monitor. Risk register. Closing: Lessons learned, Retrospective, Handover, Celebrate! Procurement closure.', workedExample: 'EVM: Planned to complete 50% work costing N100k (PV). Actually completed 40% (EV N80k) spent N90k (AC). SPI=EV/PV=0.8 behind, CPI=EV/AC=0.89 over budget.', workedExample2: 'Risk: Risk - Internet outage. Probability Medium, Impact High. Mitigation: Have offline backup, mobile hotspot.', sampleLab: 'Create risk register with 5 risks: Risk, Probability, Impact, Mitigation.', tryYourself: 'Calculate SPI/CPI for your project.', examTips: 'EVM formulas: SPI=EV/PV, CPI=EV/AC. Risk mitigation types.', cheatsheet: 'EVM: PV, EV, AC, SPI, CPI. Risk: Identify Assess Mitigate.', quiz: 'SPI <1 means?', finalProject: 'Capstone: Full project from Initiation to Closing with all docs. This completes certificate.' }
    ]
  },
  {
    slug: 'google-cybersecurity',
    title: 'Google Cybersecurity',
    description: 'Google Cybersecurity Certificate - Protect systems',
    lessons: [
      { id: 1, title: 'Lesson 1 - Cybersecurity Foundations', type: 'Theory', duration: '20 mins', content: 'CIA Triad: Confidentiality (only authorized see), Integrity (data not tampered), Availability (systems up). Threats: Malware (virus, ransomware), Phishing, Social Engineering. Defense in depth: Multiple layers. Security frameworks: NIST, ISO 27001. Ethics.', workedExample: 'Phishing email: From admin@googIe.com (I instead of l) asking password. Check sender, dont click.', workedExample2: 'Ransomware: Encrypts files asks Bitcoin. Prevent: Backup, dont open unknown attachments.', sampleLab: 'Identify 3 phishing signs in sample email.', tryYourself: 'List CIA for bank account.', examTips: 'CIA Triad is foundation.', cheatsheet: 'CIA: Confidentiality Integrity Availability.', quiz: 'What is phishing?', finalProject: 'Security awareness poster.' },
      { id: 2, title: 'Lesson 2 - Networks & Threats', type: 'Theory', duration: '25 mins', content: 'Networks: OSI 7 layers, TCP/IP. Ports: 80 HTTP, 443 HTTPS, 22 SSH. Firewalls filter traffic. IDS/IPS detect/prevent intrusions. Common attacks: DDoS (flood), Man-in-the-Middle, Brute Force (try passwords), SQL Injection. Logs: Syslog, NetFlow.', workedExample: 'Brute force: Hacker tries 1000 passwords per second. Prevent: Lock account after 5 fails, 2FA.', workedExample2: 'SQL Injection: Input " OR 1=1 -- bypasses login. Prevent: Input sanitization.', sampleLab: 'Use Wireshark to capture packets (lab). Identify TCP handshake.', tryYourself: 'What port for HTTPS?', examTips: 'Know common ports and attack types.', cheatsheet: 'Ports 80,443,22. Attacks: DDoS, MITM, Brute Force, SQLi.', quiz: 'What is DDoS?', finalProject: 'Network diagram with firewall placement.' },
      { id: 3, title: 'Lesson 3 - Linux, SQL, Python for Security', type: 'Practical', duration: '30 mins', content: 'Linux commands: ls, cd, pwd, cat, grep, chmod, sudo. Important for security analysts. SQL for logs: SELECT * FROM log WHERE event="failed_login". Python for automation: Parse logs, check hashes. Example: Python script to find failed logins >5. SIEM: Splunk, Chronicle collect logs.', workedExample: 'Linux: grep "Failed password" /var/log/auth.log finds failed SSH. Count: grep -c.', workedExample2: 'Python: for line in logfile: if "FAILED" in line: count+=1 print count', sampleLab: 'Linux lab: Create file, chmod 600, grep for error in log sample.', tryYourself: 'Write SQL to find logins from Nigeria.', examTips: 'Basic Linux and SQL queries.', cheatsheet: 'Linux: ls cd grep chmod. SQL: SELECT WHERE.', quiz: 'Command to list files? ls', finalProject: 'Python script to analyze auth log and report IPs with >5 fails.' },
      { id: 4, title: 'Lesson 4 - Detection & Response', type: 'Practical', duration: '30 mins', content: 'Incident Response Lifecycle: 1. Preparation 2. Detection & Analysis 3. Containment 4. Eradication 5. Recovery 6. Lessons Learned. Playbooks: Step-by-step for phishing, malware. Triage: Priority based on severity. Containment: Isolate infected machine from network. Eradication: Remove malware, patch. Recovery: Restore from backup. Tools: SIEM alerts, SOAR automation.', workedExample: 'Incident: Malware detected on PC. Steps: Detect via antivirus alert -> Contain disconnect network -> Eradicate reinstall OS -> Recover restore files -> Lessons learned training.', workedExample2: 'Phishing playbook: User reports phishing -> Analyze header -> If malicious, delete email from all mailboxes -> Block sender domain.', sampleLab: 'Simulate incident: Write incident report with timeline, actions.', tryYourself: 'What is first step after detection? Containment.', examTips: '6 steps of IR lifecycle in order.', cheatsheet: 'IR: Prep, Detect, Contain, Eradicate, Recover, Lessons.', quiz: 'After containment?', finalProject: 'Full incident response report for ransomware scenario - capstone.' }
    ]
  }
]

// --- EXPORTS REQUIRED BY DASHBOARD AND OTHER PAGES ---
export function getCourse(slug: string){
  if(!slug) return null
  const s = slug.toString().toLowerCase().trim()
  return COURSES.find(c => c.slug.toLowerCase() === s) || COURSES.find(c => c.slug.toLowerCase().includes(s)) || null
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
