const createSleepChart = (weeklySleep, weeklyQuality) => {
  const labels = weeklySleep.map((sleep) => sleep.date);
  const sleepValues = weeklySleep.map((sleep) => sleep.hoursSlept);
  const qualityValues = weeklyQuality.map((quality) => quality.sleepQuality);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Sleep Hours",
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
        data: sleepValues,
      },
      {
        label: "Weekly Sleep Quality",
        backgroundColor: ["rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgb(201, 203, 207)"],
        borderWidth: 1,
        data: qualityValues,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      barThickness: 20,
    },
  };
  return config;
};

const createHydrationChart = (weeklyWaterIntake) => {
  const labels = weeklyWaterIntake.map((intake) => intake.date);
  const values = weeklyWaterIntake.map((intake) => intake.numOunces);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Hydration (ounces)",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        data: values,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      barThickness: 20,
    },
  };
  return config;
};

const createCompareDonut = (currentUser, avgSteps) => {
  const labels = [currentUser.returnFirstName(), "Other Users"];
  const values = [currentUser.dailyStepGoal, avgSteps];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Step Goal Comparison",
        backgroundColor: ["rgb(153, 102, 255, .2)", "rgb(75, 192, 192, .2)"],
        borderColor: ["rgb(153, 102, 255)", "rgb(75, 192, 192)"],
        data: values,
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
    },
  };
  return config;
};

const createActivityChart = (weeklySteps, weeklyFlightsClimbed, weeklyMinutesActive) => {
  const labels = weeklySteps.map((activity) => activity.date);
  const stepValues = weeklySteps.map((activity) => activity.numSteps  ) 
  const stairValues = weeklyFlightsClimbed.map((activity) => activity.flightsOfStairs);
  const minutesActiveValues = weeklyMinutesActive.map((activity) => activity.minutesActive);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Steps",
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
        data: stepValues,
        yAxisID:'y1'
      },
      {
        label: "Weekly Flights Climbed",
        backgroundColor: ["rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgb(201, 203, 207)"],
        borderWidth: 1,
        data: stairValues,
        yAxisID:'y',
        borderDash: [5, 5]
      },
      {
        label: "Weekly Minutes Active",
        backgroundColor: ["rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgb(201, 203, 207)"],
        borderWidth: 1,
        data: minutesActiveValues,
        yAxisID:'y'
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: { color: "rgb(255, 99, 132)"},
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
  };
  return config;

  
};
export { createSleepChart, createHydrationChart, createCompareDonut, createActivityChart };
