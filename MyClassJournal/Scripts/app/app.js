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
    	name: "Tests",
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

var subjects = [
	{
		id: 1,
		name: 'Математика'
	},
	{
		id: 2,
		name: 'Русский язык'
	},
	{
		id: 3,
		name: 'История'
	}
];

var testTypes = [
	{ id: "1", name: "Контрольная работа" },
	{ id: "2", name: "Тест" },
	{ id: "3", name: "Диктант" }
];

var tests = [
{ id: 1, title: "Решение уравнений", subject: "Математика", type: "Контрольная работа" },
{ id: 2, title: "Словарные слова", subject: "Русский язык", type: "Диктант" },
{ id: 3, title: "История родного края", subject: "Русский язык", type: "Тест" }
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

function Test() {
	this.id = "";
	this.title = "";
	this.subject = "";
	this.type = "";
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
	}
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

var main = function ($scope, $uibModal, classService, baseInfoService) {
	var self = $scope;
	self.panels = panels;
	self.baseInfo = baseInfoService;
	self.currentPanel = panels[0];
	self.setCurrentPanel = function (panel) {
		self.currentPanel = panel;
	};
	self.teacher = teacher;
	self.currentClass = currentClass;
	self.myClass = classService.getClass;
	self.myPupils = classService.getPupils;
	self.setPupilCard = function (pupil) {
		self.pupilCard.pupil = pupil;
	};
	self.pupilCard = pupilCard;
	self.pupilInfo = function (pupil) {
		self.setCurrentPanel(self.panels[4]);
		self.setPupilCard(pupil);
	};
	self.openAddingForm = function (panelName) {
		var modalInstance;
		switch (panelName) {
			case 'Class':
				modalInstance = $uibModal.open({
					templateUrl: '/Modals/AddPupil',
					controller: 'ModalsController',
					size: 'sm',
					resolve: {
						newObject: function() {
							return new Pupil();
						}
					}
				});
				modalInstance.result.then(function (addedPupil) {
					addedPupil.id = self.myPupils.length + 1;
					classService.addPupil(addedPupil);
				});
				break;
			case 'Tests':
				modalInstance = $uibModal.open({
					templateUrl: '/Modals/AddTest',
					controller: 'ModalsController',
					size: 'sm',
					resolve: {
						newObject: function () {
							return new Test();
						}
					}
				});
				modalInstance.result.then(function (addedTest) {
					addedTest.id = self.myPupils.length + 1;
					baseInfoService.addTest(addedTest);
				});
				break;
			default:
				alert('Неизвестное значение: ' + panelName);
		}
	};
};

var modals = function ($scope, $uibModalInstance, baseInfoService, newObject) {
	var self = $scope;
	self.baseInfo = baseInfoService;
	self.newObject = newObject;
	self.save = function () {
		$uibModalInstance.close(self.newObject);
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

function baseInfoService() {
	this.subjects = subjects;
	this.testTypes = testTypes;
	this.tests = tests;
	this.addTest = function (test) {
		tests.push(test);
	}
};

app.service('classService', classService);
app.service('baseInfoService', baseInfoService);
var appController = app.controller('AppController', ['$scope', '$uibModal', 'classService', 'baseInfoService', main]);
var modalsController = app.controller('ModalsController', ['$scope', '$uibModalInstance', 'baseInfoService', modals]);





