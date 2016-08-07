/// <reference path="C:\Users\MnemoN\Documents\GitHub\MyClassJournalProject\MyClassJournal\Views/Modals/AddPupil.cshtml" />
/// <reference path="~/Scripts/angular.min.js" />
'use strict';

/**
 * angular
 * Description: Angular!
 */
var app = angular.module('app', ['ui.bootstrap']);


var panels = [
    {
        index: 0,
        name: "Menu",
        title: "Меню",
        href: ""
    },
    {
        index: 1,
        name: "Class",
        title: "Список класса",
        href: ""
    },
    {
        index: 2,
        name: "Journal",
        title: "Журнал",
        href: ""
    },
    {
        index: 3,
        name: "Works",
        title: "Работы",
        href: ""
    },
    {
        index: 4,
        name: "PupilCard",
        title: "Информация об ученике",
        href: ""
    }
];

function Class(obj) {
    this.id = obj.Id;
    this.teacherId = obj.TeacherId;
    this.pupilsList = obj.pupilsList;
}

function Pupil(obj) {
    this.id = obj.Id;
    this.name = obj.Name;
    this.classId = obj.ClassId;
    this.bDate = obj.Birthday;
    this.age = obj.age;
    this.gender = obj.Gender;
    this.family = obj.Family;
}
function Pupil() {
    this.id = "";
    this.name = "";
    this.classId = "";
    this.bDate = "";
    this.age = "";
    this.gender = "";
    this.family = "";
}

var someClass = {
    id: 1,
    teatherId: 1,
    pupilsList: [
		{
		    id: 1,
		    name: "Иванов Иван Иванович",
		    classId: 1,
		    bDate: "12/07/2010",
		    age: 6,
		    gender: "male",
		    family: "full"
		},
		{
		    id: 2,
		    name: "Смирнова Гадя Петрович",
		    classId: 1,
		    bDate: "12/07/2013",
		    age: 33,
		    gender: "female",
		    family: "only mather"
		}
    ]
}

var pupilCard = {
    pupil: {
        id: "",
        name: "",
        classId: 1,
        bDate: "",
        age: "",
        gender: "",
        family: ""
    },
    name: ''
}

var teacher = {
    id: 1,
    name: "Имя Фамилия Отчество",
    classId: "1",
    classsName: "8-Ы"
}

var currentClass = {
    id: 1,
    Name: "8-Ы"
}

var main = function ($scope, $uibModal, classService) {
    var self = $scope;
    self.panels = panels;
    self.currentPanel = panels[0];
    self.setCurrentPanel = function (panel) {
        self.currentPanel = panel;
    };
    self.teacher = teacher;
    self.currentClass = currentClass;
    self.myClass = classService.getClass;
    self.myPupils = classService.getPupils;
    self.setPupilCard = function (pupilId) {
        var pupil = myPupils[id === pupilId];
        pupilCard.pupil = pupil;
        pupilCard.name = pupil.name;
    };
    self.pupilCard = pupilCard;
    self.pupilInfo = function () { };
    self.openAddingForm = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Modals/AddPupil',
            controller: 'ModalsController',
            size: 'sm'
        });

        modalInstance.result.then(function (addedPupil) {
            addedPupil.id = self.myPupils.length + 1;
            classService.addPupil(addedPupil);
        });
    };
};

var modals = function ($scope, $uibModalInstance) {
    var self = $scope;
    self.currentPupil = new Pupil();
    self.save = function () {
        $uibModalInstance.close(self.currentPupil);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


};

function classService() {
    this.getClass = someClass;
    this.getPupils = someClass.pupilsList;
    this.addPupil = function (pupil) {
        someClass.pupilsList.push(pupil);
    }
};

app.service('classService', classService);
var appController = app.controller('AppController', ['$scope', '$uibModal', 'classService', main]);
var modalsController = app.controller('ModalsController', ['$scope', '$uibModalInstance', modals]);





