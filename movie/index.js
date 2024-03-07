const getdatabase = require("./db.js");

async function run() {
    try {
        const db = await getdatabase();
        const data = db.collection('data');

        // Pipeline 1
        const pipeline = [
            { $match: { year: { $gte: 1912 } } },
            { $sort: { year: 1 } },
            { $limit: 10 },
            { $sample: { size: 5 } },
            { $skip: 2 },
            { $addFields: { rating: "5" } },
            { $unset: "awards" }
        ];

        // Pipeline 2
        [
            { $match: { genres: 'Action' } },
            { $group: { _id: "$countries" } },
            { $count: "total_Movies" }
        ];

        // Pipeline 3
        [
            { $set: { greeting: "hi" } },
            { $project: { "countries": 1, "_id": 0 } }
        ];

        // Pipeline 4
        [
            { $match: { genres: { $ne: "Action" } } },
            { $project: { "genres": 1 } }
        ];

        // Pipeline 5
        [
            { $match: { "awards.wins": { $gt: 2 } } },
            { $match: { countries: "USA" } }
        ];

        // Pipeline 6
        [
            { $group: { _id: "$year", total: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ];

        // Pipeline 7
        [
            { $unwind: "$genres" },
            { $group: { _id: "$genres", count: { $sum: 1 } } }
        ];

        // Pipeline 8
        [
            { $project: { _id: 0, title: 1, year: 1, genres: 1 } },
            { $limit: 20 }
        ];

        // Pipeline 9
        [
            { $group: { _id: "$countries", total: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ];

        // Pipeline 10
        [
            { $match: { languages: { $in: ["English", "French"] } } },
            { $limit: 10 }
        ];
        for (i = 0; i <= pipeline.length; i++) { }

        const result1 = await data.aggregate(pipeline[i]).toArray();
        console.log(result1);



    } catch (err) {
        console.log(err);
    }
}

run();
