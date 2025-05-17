import axios from 'axios';
import cors from 'cors';
import express from 'express';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const SHOWS = {
  // # CL Talent Inc.
    "getcrafty.now": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "makeupmania_1": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "build_it0": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "experts129": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "what_tech": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "backtolife899": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "kind_world2022": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "satisfyingzone1": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "moodlab1212": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "mouldingjewels": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "thats_genius": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "professiona8678": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "quantum-tech": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "petstown": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "rustyhands22": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "wrapspecial": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "revampedrevampe": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "food_pirates": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "horridhouse": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.10, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "asmrtv2022": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "asmrlive22": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.40, "blake": 0.60}},

    // # MediaNug
    "beautyvibes9": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "bestofshow01": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "fitnessmemesnug": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "gymcrush6": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "healyoself3": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "poorsport7": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "swiperightshow": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "therealmvps9": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},

    // # Uncovered
    "mattcaught": {"portal_split": 0.50, "agency_split": 0.70, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "scrubsshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "caughtjordan": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},

    // # MakersTV
    "animalworldshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "homegadgets1123": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "osatisfyingshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},

    // # Burt Media Group
    "sosoothing.tv": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}},
    "epichumanbeings": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}},
    "suspect.tv":     {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}}
};

const getPreviousPeriod = (start, end) => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const prevEnd = new Date(new Date(start).getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - diff);

  return {
    start: prevStart.toISOString().split('T')[0],
    end: prevEnd.toISOString().split('T')[0],
  };
};

async function processPeriod(startDate, endDate, code) {
  let totalRevenue = 0,
    totalImpressions = 0,
    totalKaleb = 0,
    totalBlake = 0;

  const resultShows = {};
  const graphMap = new Map();

  const entries = Object.entries(SHOWS);

  const results = await Promise.all(
    entries.map(async ([show, config]) => {
      try {
        const { metadata } = await fetchMetricsDashBoardData(show, code, startDate, endDate);

        if (!metadata?.aggregated_metrics) return null;

        const revenue = metadata.aggregated_metrics.revenue || 0;
        const impressions = metadata.aggregated_metrics.sold_impressions || 0;
        const ecpm = metadata.aggregated_metrics.ecpm || 0;

        const remainder = revenue * (1 - config.portal_split);
        const sharedCut = remainder * (1 - config.agency_split - config.editor_split);
        const kalebCut = sharedCut * config.business_split.kaleb;
        const blakeCut = sharedCut * config.business_split.blake;

        return {
          show,
          revenue,
          impressions,
          ecpm,
          kalebCut,
          blakeCut,
          timeseries: metadata.timeseries_metrics || [],
        };
      } catch (error) {
        console.error(`Error fetching ${show}:`, error.message);
        return null;
      }
    })
  );

  for (const data of results) {
    if (!data) continue;

    totalRevenue += data.revenue;
    totalImpressions += data.impressions;
    totalKaleb += data.kalebCut;
    totalBlake += data.blakeCut;

    resultShows[data.show] = {
      revenue: data.revenue.toFixed(2),
      impressions: data.impressions,
      ecpm: data.ecpm.toFixed(2),
      from: startDate,
      to: endDate,
    };

    for (const item of data.timeseries) {
      const existing = graphMap.get(item.date) || {
        date: item.date,
        revenue: 0,
        sold_impressions: 0,
      };
      existing.revenue += item.revenue || 0;
      existing.sold_impressions += item.sold_impressions || 0;
      graphMap.set(item.date, existing);
    }
  }

  const graphData = Array.from(graphMap.values()).map(entry => ({
    date: entry.date,
    revenue: entry.revenue,
    sold_impressions: entry.sold_impressions,
    ecpm: entry.sold_impressions > 0
      ? (entry.revenue / entry.sold_impressions) * 1000
      : 0,
  }));

  return {
    totalRevenue,
    totalImpressions,
    totalKaleb,
    totalBlake,
    resultShows,
    graphData,
  };
}

app.get('/fetch-dashboard-metrics', async (req, res) => {
  const { startDate, endDate, code } = req.query;

  if (!startDate || !endDate || !code) {
    return res.status(400).json({ error: 'startDate, endDate and code are required' });
  }

  const current = await processPeriod(startDate, endDate, code);
  const prevRange = getPreviousPeriod(startDate, endDate);
  const previous = await processPeriod(prevRange.start, prevRange.end, code);

  const totalRevenue = current.totalRevenue;
  const prevRevenue = previous.totalRevenue;
  const revenueChange = calculatePercentageChange(totalRevenue, prevRevenue);

  const totalImpressions = current.totalImpressions;
  const prevImpressions = previous.totalImpressions;
  const impressionChange = calculatePercentageChange(totalImpressions, prevImpressions);

  const averageEcpm = calcEcpm(totalRevenue, totalImpressions);
  const prevEcpm = calcEcpm(previous.totalRevenue, previous.totalImpressions);
  const ecpmChange = calculatePercentageChange(averageEcpm, prevEcpm);

  const kalebChange = calculatePercentageChange(current.totalKaleb, previous.totalKaleb);
  const blakeChange = calculatePercentageChange(current.totalBlake, previous.totalBlake);

  return res.json({
    shows: Object.entries(current.resultShows).map(([name, data]) => ({ name, ...data })),
    graphData: current.graphData,
    aggregated: {
      total_revenue: totalRevenue.toFixed(2),
      total_impressions: totalImpressions,
      average_ecpm: averageEcpm.toFixed(2),
      total_kalebs_cut: current.totalKaleb.toFixed(2),
      total_blakes_cut: current.totalBlake.toFixed(2),
      change: {
        revenue: revenueChange,
        impressions: impressionChange,
        ecpm: ecpmChange,
        kaleb: kalebChange,
        blake: blakeChange,
      },
    },
  });
});


function calcEcpm(revenue, impressions) {
  return impressions > 0 ? (revenue / impressions) * 1000 : 0;
}

const fetchMetricsDashBoardData = async (showId, code, startDate, endDate) => {
  const url = `https://api.snapkit.com/v1/stories/studio/revenue/creator/${showId}/aggregate`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${code}`,
      },
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });

    return response.data;
  } catch (err) {
    console.error(`Error fetching ${showId}:`, err.response?.status || err.message);
    return { metadata: { aggregated_metrics: {}, timeseries_metrics: [] } };
  }
};

function calculatePercentageChange(current, previous) {
  if (previous === 0) return null;
  const change = ((current - previous) / previous) * 100;
  return Number(change.toFixed(2));
}


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
