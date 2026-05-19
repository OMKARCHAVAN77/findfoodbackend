const express = require("express");
const { getAllMess, saveRating, getRatingData, addViews, getViews } = require("../controllers/customerController");
const getMessDataMiddleware = require("../middlewares/getMessDataMiddleware");
const View = require("../models/views");

const router = express.Router()


router.get("/getAllMess",getAllMess)
router.post("/saveRating",saveRating)

router.get("/getRatingData",getMessDataMiddleware,getRatingData)
router.get("/getViews",getMessDataMiddleware,getViews)

router.post("/addViews",getMessDataMiddleware,addViews)

const getGroupedViews = async (groupBy, messUserId) => {
    const moment = require("moment");
  
    let format = "";
    let timeUnit = "";
    let generateFormat = "";
  
    // Set formats based on the grouping type
    if (groupBy === "daily" || !groupBy) {
      // Daily grouping
      format = "%Y-%m-%d";  // MongoDB aggregation format for daily
      timeUnit = "days";     // Moment unit for subtraction
      generateFormat = "YYYY-MM-DD"; // Moment format to generate daily period string
    } else if (groupBy === "weekly") {
      // Weekly grouping using ISO week numbers
      format = "%Y-%V";      // Use ISO week number (%V) for MongoDB aggregation
      timeUnit = "weeks";
      generateFormat = "GGGG-ww"; // Moment's ISO week-year and week number (e.g. "2025-08")
    } else if (groupBy === "monthly") {
      // Monthly grouping
      format = "%Y-%m";      // MongoDB monthly format
      timeUnit = "months";
      generateFormat = "YYYY-MM";  // Moment format for month
    } else if (groupBy === "yearly") {
      // Yearly grouping
      format = "%Y";         // MongoDB yearly format
      timeUnit = "years";
      generateFormat = "YYYY";     // Moment format for year
    }
  
    // Create a match stage to filter by messUserId (if provided)
    const matchStage = messUserId ? { messUserId: messUserId } : {};
  
    // Fetch the aggregated data from MongoDB
    const actualData = await View.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: format, date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  
    // Generate the last 5 periods using moment and the proper format.
    // We subtract i units (days/weeks/months/years) and format accordingly.
    const last5Periods = [...Array(5)]
      .map((_, i) => moment().subtract(i, timeUnit).format(generateFormat))
      .reverse(); // Reverse so the oldest is first
  
    // Create a map from the aggregation results for quick lookup
    const dataMap = new Map(actualData.map((item) => [item._id, item.count]));
  
    // Build the final result by mapping each generated period to its count (or 0 if missing)
    const finalData = last5Periods.map((period) => ({
      _id: period,
      count: dataMap.get(period) || 0
    }));
  
    return finalData;
  };
  








router.post("/views", getMessDataMiddleware,async (req, res) => {
    try {

        const messUserId = req.data.id

        console.log(req.body);

        const period = req.body.period


        if (!messUserId) {
            return res.status(400).json({ success: false, message: "messUserId is required" });
        }

        const viewsData = await getGroupedViews(period || "daily", messUserId);

        res.status(200).json(viewsData);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});




module.exports = router;