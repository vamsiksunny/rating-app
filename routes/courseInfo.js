const courseRoutes = require('express').Router();
const courseData = require('../courses.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


courseRoutes.use(bodyParser.json());

courseRoutes.get('/', (req, res) => {
    return res.status(200).json(courseData);
});

courseRoutes.get('/:id', (req, res) => {
    let airtribeCourse = courseData.airtribe;
    let courseIdPassed = req.params.id;
    let result = airtribeCourse.filter(val => val.id == courseIdPassed);
    // let result = airtribeCourse;
    if (result == null || result == undefined || result.length == 0   ) {
        return res.status(404).json({"message" : "The requested course doesn't exist!!!"});
    }

    return res.status(200).json(result);
});

courseRoutes.post('/', (req, res) => {
    const courseDetails = req.body;
    let writePath = path.join(__dirname, '..', 'courses.josn');
    let courseDataModified = JSON.parse(JSON.stringify(courseData));
    courseDataModified.airtribe.push(courseDetails);
    try {
        fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {encoding : 'utf-8', flag : 'w'});
        return res.status(200).json({"message" : "Successfully created"});
    } catch (err) {
        return res.status(500).json({"message" : "Failed"});
    }

});

module.exports = courseRoutes;