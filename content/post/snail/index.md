---
title: 'A Study of Snail Behavior'
subtitle: 'Create a beautifully simple website in under 10 minutes :rocket:'
summary: Create a beautifully simple website in under 10 minutes.
authors:
- admin
tags:
- academia
categories: []
date: "2016-04-20T00:00:00Z"
lastmod: "2019-04-17T00:00:00Z"
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/CpkOjOcXdUY)'
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

**Clinical Value of Information**
{{< rawhtml >}}
<!DOCTYPE html>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css"
/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- Latest compiled and minified CSS -->
<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
-->
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>

<!-- Optional theme -->
<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
-->
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  crossorigin="anonymous"
></script>
<script
  src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
  crossorigin="anonymous"
></script>
<!-- Latest compiled and minified JavaScript -->
<!--<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
-->
<link
  href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

<html lang="en">
  <head>
    <title>Value of Information</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="/css/style.css" />

    <!-- import the webpage's javascript file -->
    <script src="https://d3js.org/d3.v5.js"></script>
    <script src="https://unpkg.com/d3-simple-slider"></script>
    <script src="/js/box.js" defer></script>
    <script src="/js/d3-tip.js" defer></script>
    <script src="/js/d3-legend.js"></script>
    <script src="/js/script.js" defer></script>
  </head>
  <body>
    <form id="general_params">
      <table class="table table-nonfluid table-bordered table-condensed">
        <tbody id="health_costs_and_clinical">
          <tr>
            <th colspan="2">Health Costs and Clinical Context</th>
          </tr>
          <tr>
            <td class="td label">Willingness to pay (USD per QALY)</td>
            <td>
              <input
                type="text"
                name="willingness_to_pay"
                value="150000"
                placeholder="Willingness to pay"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">
              Baseline Life Expectancy of Population (years)
            </td>
            <td>
              <input
                type="text"
                name="life_expectancy"
                value="10"
                placeholder="Life expectancy"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Cost of adverse event (USD)</td>
            <td>
              <input
                type="text"
                name="cost_of_event"
                value="0"
                placeholder="Cost of event"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">QALY Decrement of Event (1 = death)</td>
            <td>
              <input
                type="text"
                name="event_qaly_decrement"
                value="0.5"
                placeholder="Event QALY decrement"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Total Population</td>
            <td>
              <input
                type="text"
                name="total_population"
                value="100000"
                placeholder="Population"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <form id="subpop1">
      <table class="table table-nonfluid table-bordered table-condensed">
        <tbody id="supopulation_1">
          <tr>
            <th colspan="2">Subpopulation of Interest</th>
          </tr>
          <tr>
            <td class="td label">Name of subpopulation</td>
            <td>
              <input
                type="text"
                name="subpopulation_name"
                value="Female"
                placeholder="Subpopulation name"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">
              Minimum prevalence of subpopulation
            </td>
            <td>
              <input
                type="text"
                name="prevalence.min"
                value="0.4"
                placeholder="Min prevalence"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">
              Maximum prevalence of subpopulation
            </td>
            <td>
              <input
                type="text"
                name="prevalence.max"
                value="0.6"
                placeholder="Max prevalence"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-nonfluid table-bordered table-condensed">
        <tbody id="event_rate_info">
          <tr>
            <th colspan="3">
              Current Info About Event Rate and Treatments in Subpopulation
            </th>
          </tr>
          <tr>
            <th>Attribute</th>
            <th>Treatment 1</th>
            <th>Treatment 2</th>
          </tr>
          <tr>
            <td class="td label">Name</td>
            <td>
              <input
                type="text"
                name="treatment_1.name"
                value="Control"
                placeholder="Name"
              />
            </td>
            <td>
              <input
                type="text"
                name="treatment_2.name"
                value="Experimental"
                placeholder="Name"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Denominator Population in Prior Study</td>
            <td>
              <input
                type="text"
                name="treatment_1.pop"
                value="50"
                placeholder="Population"
              />
            </td>
            <td>
              <input
                type="text"
                name="treatment_2.pop"
                value="50"
                placeholder="Population"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Adverse Events in Prior Study</td>
            <td>
              <input
                type="text"
                name="treatment_1.events"
                value="11"
                placeholder="Population"
              />
            </td>
            <td>
              <input
                type="text"
                name="treatment_2.events"
                value="9"
                placeholder="Events"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">
              Baseline outcomes in absence of event (QALYs)
            </td>
            <td>
              <input
                type="text"
                name="treatment_1.baseline_outcomes"
                value="0.9"
                placeholder="Outcomes"
              />
            </td>
            <td>
              <input
                type="text"
                name="treatment_2.baseline_outcomes"
                value="0.8"
                placeholder="Outcomes"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Treatment Cost (USD)</td>
            <td>
              <input
                type="text"
                name="treatment_1.cost"
                value="35000"
                placeholder="Outcomes"
              />
            </td>
            <td>
              <input
                type="text"
                name="treatment_2.cost"
                value="40000"
                placeholder="Outcomes"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div id="boxChartHolder"></div>
      <table class="table table-nonfluid table-bordered table-condensed">
        <tbody id="study_info">
          <tr>
            <th colspan="2">
              Costs of a New Study
            </th>
          </tr>
          <tr>
            <td class="td label">Fixed Costs of Study (USD)</td>
            <td>
              <input
                type="text"
                name="study_fixed_cost"
                value="200000"
                placeholder="Fixed cost"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Per-Patient Screening Cost (USD)</td>
            <td>
              <input
                type="text"
                name="patient_screening_cost"
                value="1000"
                placeholder="Per-patient cost"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Multiplier for treatment cost during study</td>
            <td>
              <input
                type="text"
                name="treatment_cost_multiplier"
                value="1.1"
                placeholder="Study cost multiplier"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">
              Study sizes, should be divisible by 2 for equal-sized arms
              (Comma-separated list)
            </td>
            <td>
              <input
                type="text"
                name="study_sizes"
                value="60,100,160,200,300,500,800,1400,1800,4000"
                placeholder="Study sizes"
              />
            </td>
          </tr>
          <tr>
            <td class="td label">Simulations</td>
            <td>
              <input
                class="form-control-sm"
                type="text"
                name="simulations"
                value="1000"
                placeholder="Simulations"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <table class="table table-nonfluid table-bordered table-condensed">
      <tbody id="graph_controls">
        <tr>
          <th colspan="2">
            Graph Controls
          </th>
        </tr>
        <tr>
          <td class="td label">
            Toggle results between Net Monetary Benefit (NMB) and
            Quality-Adjusted Life Years (QALY):
          </td>
          <td>
            <input
              type="checkbox"
              data-toggle="toggle"
              data-on="NMB"
              data-off="QALY"
              id="metricToggle"
            />
          </td>
        </tr>
        <tr>
          <td class="td label">Possible Subpopulation Prevalence</td>
          <td>
            <div id="netPrevSliderHolder"></div>
          </td>
        </tr>
        <tr>
          <td class="td label">Probability of event in treatment 2 for power calculation</td>
          <td>
            <div id="powerSliderHolder"></div>
          </td>
        </tr>
        <tr>
          <td class="td label">Update graph with new settings</td>
          <td>
            <input
        name="updateButton"
        type="button"
        value="Calculate"
        onclick="updateData()"
      />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <label for="metricToggle"
        >Toggle results between Net Monetary Benefit (NMB) and Quality-Adjusted
        Life Years (QALY):
      </label>
    </div>

    <div id="answer"></div>
    <!-- include the Glitch button to show what the webpage is about and
          to make it easier for folks to view source and remix -->
    <div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>
    <script src="https://button.glitch.me/button.js"></script>



    <div id="evsiChartHolder"></div>


    <div id="sampleChartHolder"></div>
  </body>
</html>

{{< /rawhtml >}}
