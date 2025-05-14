import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function determineMode(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  if (diffInDays > 365) return 'month';
  if (diffInDays > 30) return 'week';
  return 'day';
}

function getDateRanges(startDate, endDate, mode = 'day') {
  const ranges = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current < end) {
    let next = new Date(current);
     if (mode === 'day') {
      next.setDate(current.getDate() + 1);
    } else if (mode === 'week') {
      next.setDate(current.getDate() + 7); // Correct way to add 1 week
    } else if (mode === 'month') {
      next.setMonth(current.getMonth() + 1);
    }

    const rangeStart = current.toISOString().split('T')[0];
    const rangeEnd = new Date(Math.min(next.getTime(), end.getTime())).toISOString().split('T')[0];
    ranges.push({ start: rangeStart, end: rangeEnd });

    current = next;
  }

  const lastRange = ranges[ranges.length - 1];
  if (lastRange && lastRange.end !== end.toISOString().split('T')[0]) {
    ranges.push({
      start: lastRange.end,
      end: end.toISOString().split('T')[0],
    });
  }

  return ranges;
}

app.get('/fetch-metrics', async (req, res) => {
  const { startDate, endDate, code } = req.query;

  const SHOWS = {
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

    "beautyvibes9": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "bestofshow01": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "fitnessmemesnug": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "gymcrush6": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "healyoself3": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "poorsport7": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "swiperightshow": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "therealmvps9": {"portal_split": 0.70, "agency_split": 0.40, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "mattcaught": {"portal_split": 0.50, "agency_split": 0.70, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "scrubsshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "caughtjordan": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "animalworldshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "homegadgets1123": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "osatisfyingshow": {"portal_split": 0.50, "agency_split": 0.50, "editor_split": 0.05, "business_split": {"kaleb": 0.40, "blake": 0.60}},
    "sosoothing.tv": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}},
    "epichumanbeings": {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}},
    "suspect.tv":     {"portal_split": 0.70, "agency_split": 0.50, "editor_split": 0.00, "business_split": {"kaleb": 0.30, "blake": 0.70}}

  };

  const fetchMetricsForShow = async (showId, start, end) => {
    const url = `https://api.snapkit.com/v1/stories/studio/revenue/creator/${showId}/stories`;
    const params = { start_date: start, end_date: end };
    const headers = { authorization: `Bearer ${code}` };

    try {
      const response = await axios.get(url, { headers, params });
      const stories = response.data.stories || [];
      const revenue = stories.reduce((sum, story) => sum + (story.aggregated_metrics?.revenue || 0), 0);
      const impressions = stories.reduce((sum, story) => sum + (story.aggregated_metrics?.sold_impressions || 0), 0);
      return { revenue, impressions, error: null };
    } catch (error) {
      return { revenue: 0, impressions: 0, error: `Failed to fetch for ${showId}: ${error.message}` };
    }
  };

  const mode = determineMode(startDate, endDate);
  const dateRanges = getDateRanges(startDate, endDate, mode);

  const rangeMap = new Map();
  const errors = [];
  const tasks = [];

  let totalRevenue = 0, totalImpressions = 0, totalKaleb = 0, totalBlake = 0;
  const showAggregates = {};

  for (const { start, end } of dateRanges) {
  for (const [show, config] of Object.entries(SHOWS)) {
    tasks.push((async () => {
      const { revenue, impressions, error } = await fetchMetricsForShow(show, start, end);

      if (!showAggregates[show]) showAggregates[show] = { revenue: 0, impressions: 0 };

      if (error) {
        errors.push({ show, message: error });
        return { show, start, end, revenue: 0, impressions: 0, kalebCut: 0, blakeCut: 0 };
      }

      const remainingRevenue = revenue * (1 - config.portal_split);
      const kalebCut = remainingRevenue * (1 - config.agency_split - config.editor_split) * config.business_split.kaleb;
      const blakeCut = remainingRevenue * (1 - config.agency_split - config.editor_split) * config.business_split.blake;

      showAggregates[show].revenue += revenue;
      showAggregates[show].impressions += impressions;

      return { show, start, end, revenue, impressions, kalebCut, blakeCut };
    })());
  }
}

  const results = await Promise.all(tasks);

  for (const result of results) {
    const key = result.start;
    if (!rangeMap.has(key)) rangeMap.set(key, { revenue: 0, impressions: 0, kaleb: 0, blake: 0 });
    const data = rangeMap.get(key);
    data.revenue += result.revenue;
    data.impressions += result.impressions;
    data.kaleb += result.kalebCut;
    data.blake += result.blakeCut;

    totalRevenue += result.revenue;
    totalImpressions += result.impressions;
    totalKaleb += result.kalebCut;
    totalBlake += result.blakeCut;
  }

  const tempTrend = [], tempDaily = [];
  for (const [date, value] of rangeMap.entries()) {
    if (new Date(date) > new Date(endDate)) continue;

    const ecpm = value.impressions ? (value.revenue / value.impressions * 1000) : 0;

    tempTrend.push({ date, revenue: value.revenue, impressions: value.impressions, ecpm });
    tempDaily.push({ date, revenue: value.revenue, kalebs_cut: value.kaleb, blakes_cut: value.blake, net_profit: value.blake, impressions: value.impressions, ecpm });
  }

  const sortByDate = (a, b) => new Date(a.date) - new Date(b.date);
  tempTrend.sort(sortByDate);
  tempDaily.sort(sortByDate);

  const findOrDefaultTrend = (d) => tempTrend.find(x => x.date === d) || { date: d, revenue: 0, impressions: 0, ecpm: 0 };
  const findOrDefaultDaily = (d) => tempDaily.find(x => x.date === d) || { date: d, revenue: 0, kalebs_cut: 0, blakes_cut: 0, net_profit: 0, impressions: 0, ecpm: 0 };

  const trendData = [findOrDefaultTrend(startDate), ...tempTrend.filter(d => d.date !== startDate && d.date !== endDate), findOrDefaultTrend(endDate)];
  const dailyData = [findOrDefaultDaily(startDate), ...tempDaily.filter(d => d.date !== startDate && d.date !== endDate), findOrDefaultDaily(endDate)];

  const totalEcpm = totalImpressions ? (totalRevenue / totalImpressions * 1000) : 0;

  const aggregatedShows = Object.entries(showAggregates).map(([show_name, stats]) => {
    const ecpm = stats.impressions ? (stats.revenue / stats.impressions * 1000) : 0;
    return { show_name, date_range: { from: startDate, to: endDate }, revenue: stats.revenue, impressions: stats.impressions, ecpm };
  });

  const output = {
    dailyData,
    aggregated: {
      total_revenue: totalRevenue,
      total_impressions: totalImpressions,
      total_kalebs_cut: totalKaleb,
      total_blakes_cut: totalBlake,
      total_net_profit: totalBlake,
      average_ecpm: totalEcpm
    },
    aggregatedShows,
    historical: {
      previousPeriod: {
        aggregated: {
          total_revenue: 1378378.42,
          total_impressions: 48646007,
          total_kalebs_cut: 689189.44,
          total_blakes_cut: 344594.77,
          total_net_profit: 344594.77,
          average_ecpm: 28.33
        }
      },
      trend: trendData
    },
    errors
  };

  res.json(output);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
