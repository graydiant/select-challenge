## Installation

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.


# Background

Throughout the SELECT web application app, we have a date picker users can use to select the relevant time range they want to look at. When you click "Last 7 Days", it will automatically populate the startDate and endDate url parameters with the relevant dates. The problem with this is users will bookmark the URL, and a week later come back to a dashboard showing data from one week ago since the dates are still hardcoded in the URL. 

![image](/assets/261353788-b78c1d21-210c-40a8-b178-564dcc856f0c.png)

We want to update this behaviour to have a URL param that indicates they've picked the "last7Days" option. When a user visits a URL with this parameter set, it will re-calculate the last 7 days and use that as the date range.

# Sample Web Application

We have created a simple, single page web application. There's a dropdown selector on the left to pick a preset date range, and a date picker on the right to select a custom range of dates (note, this datepicker also comes with some preset date ranges - PLEASE IGNORE THESE for this exercise).

This is the application you'll be modifying.


# The Ask

Please implement the following functionality, using Typescript:

## URL Params

Store the following state in URL params using the NextJS router

- dateRange
    - Possible values:
        - last7Days
        - last14Days
        - lastMonth
        - last6Months
- startDate
    - e.g. 2023-06-14
- endDate
    - e.g. 2023-06-14

## Desired Functionality

If a shortcut of e.g. ‘Last 7 Days’ is selected in the left dropdown, the dateRange URL param should be set to last7Days. There should be no startDate or endDate URL params. The date picker on the right should be set to the last 7 days, with the internal start and end dates state set to the corresponding dates. The idea is that if the user comes back to this exact same URL the day after, the start and end dates on the page should have moved one day forward.

If a date range is selected in the date selector directly, the URL params of startDate and endDate should be set. There should be no dateRange URL param. The left most drop down box should switch to the ‘Custom’ option. In this scenario, if the user comes back to the same URL the day after, the start and end dates should be identical.

The page should default to the last 7 days if no params are set on initial load.

## Tips for working with dates

We rely on [dayjs](https://day.js.org/) in our application database for working with dates & times. We've installed it as a dependency in this repo.

See examples logged to console for a quick start. Please feel free to remove all the logging before you submit your final code.

# Deliverables

Clone / fork this repo, and make the changes required to meet the desired functionality. Once you're finished, we'll schedule a call and ask you to walk us through how you've solved the problem.

We're after clear, maintainable code, that you would feel happy with submitting to a production codebase.

If you have questions at any point, don't hesitate to reach out to us (ian@select.dev or niall@select.dev).
