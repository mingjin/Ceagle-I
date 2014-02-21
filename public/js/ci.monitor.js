onmessage = function(event) {
    var data = event.data;
    updateUI(data);
}

function updateUI(data)
{
    postMessage(data);
}

function parsePipeline(data){
    var project = {};
    for (var key in data){
                project.name = key;
                project.jobs = data[key].jobs;
                project.sub_projects = data[key].submodules;
    }
    var sub_projects = [];
    for (var key in project.sub_projects){               
                var sub_project = {};
                sub_project.name = key;
                sub_project.jobs = project.sub_projects[key].jobs;
                sub_project.ci_modules=[];
                for(var sub in project.sub_projects[key].submodules){
                    var ci_modules = {};
                    ci_modules.name = sub;
                    ci_modules.jobs = project.sub_projects[key].submodules[sub].jobs;
                    sub_project.ci_modules.push(ci_modules);
                }
                sub_projects.push(sub_project);
    }  
    project.sub_projects = sub_projects;
    return project;
}