/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
    "name" : "Yoni Kilzi",
    "role" : "Web Developer",
    "contacts" : {
        "mobile": "1-800-555-555",
        "email": "y0n1@gmail.com", 
        "github": "y0n1",
        "location": "Kfar Sava, Israel"
    },
    "welcomeMessage": "I don't stop when I am tired, I stop when I am done...", 
    "skills": ["Black Magic", "Kung Fu", "WooDoo", "Scooby Doo", "Capoeira"],
    "biopic": "https://avatars2.githubusercontent.com/u/4301367?v=3&s=230",
    "display": function() {
        $('#header').prepend(HTMLheaderName.replace('%data%', bio.name));
        $('#name').after(HTMLheaderRole.replace('%data%', bio.role));
        $('#topContacts, #footerContacts').append(HTMLmobile.replace('%data%', bio.contacts.mobile));
        $('#topContacts, #footerContacts').append(HTMLemail.replace('%data%', bio.contacts.email));
        $('#topContacts, #footerContacts').append(HTMLgithub.replace('%data%', bio.contacts.github));
        $('#topContacts, #footerContacts').append(HTMLlocation.replace('%data%', bio.contacts.location));
        $('#topContacts').after(HTMLbioPic.replace('%data%', bio.biopic));
        $('.biopic').after(HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage));
        $('.welcome-message').after(HTMLskillsStart);
        bio.skills.forEach(function(skill){
            $('#skills').append(HTMLskills.replace('%data%', skill));
        });
    }
};

var work = {
    "jobs": [{
        "employer": "Amdocs", 
        "title": "Software Developer",
        "location": "Raanana, Israel",
        "dates": "Oct, 2015 - ?",
        "description": "Contribute to the development of new software products and services by developing and implementing code in line with design specifications and business requirements.",
    }],     
    "display": function(){
        $('#workExperience').append(HTMLworkStart);
        work.jobs.forEach(function(job){
            $('.work-entry').append(HTMLworkEmployer.replace('%data%', job.employer));
            $('.work-entry > a:last').append(HTMLworkTitle.replace('%data%', job.title));
            $('.work-entry').append(HTMLworkDates.replace('%data%', job.dates));
            $('.work-entry').append(HTMLworkLocation.replace('%data%', job.location));
            $('.work-entry').append(HTMLworkDescription.replace('%data%', job.description));
        });
    }
};

var projects = {
    "projects": [{
        "title": "Typeahead",
        "dates": "Apr, 2016",
        "description": "A Java implementation of a typeahead mechanism (IntelliSense)",
        "images": ["https://hackpad-attachments.s3.amazonaws.com/hackpad.com_XLrlyadDYU7_p.95317_1409928904769_auto-complete-field.gif"]
    }],
    "display": function(){
        $('#projects').append(HTMLprojectStart);
        projects.projects.forEach(function(project){
            $('.project-entry').append(HTMLprojectTitle.replace('%data%', project.title));
            $('.project-entry').append(HTMLprojectDates.replace('%data%', project.dates));
            $('.project-entry').append(HTMLprojectDescription.replace('%data%', project.description));
            project.images.forEach(function(image) {
                $('.project-entry').append(HTMLprojectImage.replace('%data%', image));
            });
        });
    }
};

var education = {
    "schools": [{
        "name": "IDC Herzliya",
        "location": "Herzliya, Israel",
        "degree": "BSc",
        "majors": ["CS"],
        "dates": "2012 - 2016",
        "url": "www.idc.ac.il"
    }],           
    "onlineCourses": [{
        "title": "Front End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "July, 2016 - ?",
        "url": "www.udacity.com",
    }],
    "display": function(){
        $('#education').append(HTMLschoolStart);
        education.schools.forEach(function(school){
            $('.education-entry').append(HTMLschoolName.replace('%data%', school.name));
            $('.education-entry > a:last').append(HTMLschoolDegree.replace('%data%', school.degree));
            $('.education-entry').append(HTMLschoolDates.replace('%data%', school.dates));
            $('.education-entry').append(HTMLschoolLocation.replace('%data%', school.location));
            school.majors.forEach(function(major) {
                $('.education-entry').append(HTMLschoolMajor.replace('%data%', major));
            });            
        });
        $('#education').append(HTMLonlineClasses);
        $('#education').append(HTMLschoolStart);
        education.onlineCourses.forEach(function(onlineCourse){
            $('.education-entry:last').append(HTMLonlineTitle.replace('%data%', onlineCourse.title));
            $('.education-entry:last > a:last').append(HTMLonlineSchool.replace('%data%', onlineCourse.school));
            $('.education-entry:last').append(HTMLonlineDates.replace('%data%', onlineCourse.dates));
            $('.education-entry:last').append(HTMLonlineURL.replace('%data%', onlineCourse.url));
        });
    }
};

bio.display();
education.display();
work.display();
projects.display();
$('#mapDiv').append(googleMap);
