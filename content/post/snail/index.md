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



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- Latest compiled and minified CSS -->
<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

<!-- Optional theme -->
<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
-->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<!-- Latest compiled and minified JavaScript -->
<!--<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
-->
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
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
    <script src="/js/script.js" defer></script>
  </head>
  <body>
    <form id="pretty_params">
    <table class="table table-bordered table-condensed">
      <tbody id="health_costs_and_clinical">
        <tr>
          <th colspan=2>Health Costs and Clinical Context </th>
        </tr>
        <tr>
          <td>simulations</td>
          <td>simulations</td>
        </tr>
      </tbody>
    </table>
    </form>
    <form id="general_params">
      <li>
        <label for="simulations">Simulations</label>
        <input type="text" name="simulations" value="1000" />
      </li>
      <li>
        <label for="study_sizes">Study sizes, should be divisible by 2 for equal-sized arms (Comma-separated list)</label>
        <input type="text" name="study_sizes" value="60,100,160,200,300,500,800,1400,1800,4000"/>
      </li>
      <li>
        <label for="willingness_to_pay">Willingness to pay (USD/QALY)</label>
        <input type="text" name="willingness_to_pay" value="150000"/>
      </li>
      <li>
        <label for="life_expectancy"
          >Baseline Life Expectancy of Population (years)</label
        >
        <input type="text" name="life_expectancy" value="7"/>
      </li>
      <li>
        <label for="cost_of_event">Cost of adverse event (USD)</label>
        <input type="text" name="cost_of_event" value="0"/>
      </li>
      <li>
        <label for="event_qaly_decrement"
          >QALY Decrement of Event (1 = death)</label
        >
        <input type="text" name="event_qaly_decrement" value="1"/>
      </li>
      <li>
        <label for="study_fixed_cost">Fixed Costs of Study (USD)</label>
        <input type="text" name="study_fixed_cost" value="200000"/>
      </li>
      <li>
        <label for="patient_screening_cost">Per-Patient Screening Cost (USD)</label>
        <input type="text" name="patient_screening_cost" value="1000"/>
      </li>
      <li>
        <label for="treatment_cost_multiplier">Multiplier for treatment cost during study</label>
        <input type="text" name="treatment_cost_multiplier" value="1.1"/>
      </li>
      <li>
        <label for="total_population">Total population with disease</label>
        <input type="text" name="total_population" value="100000"/>
      </li>
    </form>
    <form id="subpop1">
      Subpopulation 1:
      <li>
        <label for="subpopulation_name">Name of subpopulation</label>
        <input type="text" name="subpopulation_name" value="Afib HR above median"/>
      </li>
      <li>
        <label for="prevalence.min">Minimum Prevalence</label>
        <input type="text" name="prevalence.min" value="0.05"/>
      </li>
      <li>
        <label for="prevalence.min">Maximum Prevalence</label>
        <input type="text" name="prevalence.max" value="1.0"/>
      </li>
      Treatment 1:
      <li>
        <label for="treatment_1.name">Name</label>
        <input type="text" name="treatment_1.name" value="ICD"/>
      </li>
      <li>
        <label for="treatment_1.pop">Population</label>
        <input type="text" name="treatment_1.pop" value="54"/>
      </li>
      <li>
        <label for="treatment_1.events">events</label>
        <input type="text" name="treatment_1.events" value="18"/>
      </li>
      <li>
        <label for="treatment_1.baseline_outcomes"
          >Baseline outcomes in absence of event (QALYs)</label
        >
        <input type="text" name="treatment_1.baseline_outcomes" value="0.874"/>
      </li>
      <li>
        <label for="treatment_1.cost">Cost (USD)</label>
        <input type="text" name="treatment_1.cost" value="33579"/>
      </li>
      Treatment 2:
      <li>
        <label for="treatment_2.name">Name</label>
        <input type="text" name="treatment_2.name" value="CRT-D"/>
      </li>
      <li>
        <label for="treatment_2.pop">Population</label>
        <input type="text" name="treatment_2.pop" value="58"/>
      </li>
      <li>
        <label for="treatment_2.events">events</label>
        <input type="text" name="treatment_2.events" value="24"/>
      </li>
      <li>
        <label for="treatment_2.baseline_outcomes"
          >Baseline outcomes in absence of event (QALYs)</label
        >
        <input type="text" name="treatment_2.baseline_outcomes" value="0.884"/>
      </li>
      <li>
        <label for="treatment_2.cost">Cost (USD)</label>
        <input type="text" name="treatment_2.cost" value="41318"/>
      </li>
    </form>
    <input type="checkbox" data-toggle="toggle" data-on="NMB" data-off="QALY" id="metricToggle">
    <div id="answer"></div>
    <!-- include the Glitch button to show what the webpage is about and
          to make it easier for folks to view source and remix -->
    <div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>
    <script src="https://button.glitch.me/button.js"></script>

    <div id="option">
    <input name="updateButton"
           type="button"
           value="Update"
           onclick="updateData()" />
</div>
    <div id="boxChartHolder"></div>
    <div id="evsiChartHolder"></div>
    <div id="powerSliderHolder"></div>
    <div id="netPrevSliderHolder"></div>
    <div id="netEvsiChartHolder"></div>
    <div id="sampleChartHolder"></div>

  </body>
</html>

{{< /rawhtml >}}
