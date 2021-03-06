
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/:crnVal', function(req, res){
	

        fs.writeFile('output.json', 'test', function (err) {

        });
        var i;
    
        for(i = 80000; i <= 80100; i++) {
            
        console.log(i); 
                    request.post({url:'https://banweb.banner.vt.edu/ssb/prod/HZSKVTSC.P_ProcRequest', form: {CRN : i, TERMYEAR: '201509', CAMPUS: '0', SCHDTYPE: '%', SUBJ_CODE: '%', CORE_CODE: 'AR%', PRINT_FRIEND: 'Y', history: 'N', BTN_PRESSED: 'Printer+Friendly+List'}}, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

          
			var crn, course, title, type, crHrs, capacity, instructor, days1, beginTime1, endTime1, location1, days2, beginTime2, endTime2, location2, days3, beginTime3, endTime3, location3;
			var json = { crn : "", course: "", title: "", type: "", crHrs: "", capacity: "", instructor: "", days1: "", beginTime1: "", endTime1: "", location1: "", days2: "", beginTime2: "", endTime2: "", location2: "", days3: "", beginTime3: "", endTime3: "", location3: ""};

            var count = 0; 
            $('.pldefault').filter(function() { 
                var data = $(this);
                
                console.log(count + " TEST " + data.text().trim()); 
                
                switch(count) {
                    case 0: json.crn = data.text().trim(); break; 
                    case 1: json.course = data.text().trim(); break;
                    case 2: json.title = data.text().trim(); break;
                    case 3: json.type = data.text().trim(); break;
                    case 4: json.crHrs = data.text().trim(); break;
                    case 5: json.capacity = data.text().trim(); break;    
                    case 6: json.instructor = data.text().trim(); break;    
                    case 7: json.days1 = data.text().trim(); break;
                    case 8: json.beginTime1 = data.text().trim(); break;
                    case 9: json.endTime1 = data.text().trim(); break;
                    case 10: json.location1 = data.text().trim(); break;
                        
                    case 17: json.days2 = data.text().trim(); break;
                    case 18: json.beginTime2 = data.text().trim(); break;
                    case 19: json.endTime2 = data.text().trim(); break;
                    case 20: json.location2 = data.text().trim(); break;
                        
                    case 27: json.days3 = data.text().trim(); break;
                    case 28: json.beginTime3 = data.text().trim(); break;
                    case 29: json.endTime3 = data.text().trim(); break;
                    case 30: json.location3 = data.text().trim(); break;   
                }
                
                count++;
            });
            
            if(json.crn != '') {
                fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
                
                console.log("Done"); 
            })

            }
	      
		}


	   })
    }
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'))
console.log("Running"); 
exports = module.exports = app; 
