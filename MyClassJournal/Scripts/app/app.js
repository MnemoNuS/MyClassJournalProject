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
	{
		id: 1, title: "Контрольная работа за первое полугодие", subject: "Русский язык", type: "Административная онтрольная работа", skills:
		[
			{
				title: 'Определять предложения',
				isCheck: false,
				points: '1'
			},
			{
				title: 'Большая буква в начале предложения',
				isCheck: false,
				points: '1'
			}
		]
	},
{
	id: 2, title: "Словарные слова", subject: "Русский язык", type: "Диктант", skills:
		  [
			  {
			  	title: 'Большая буква в начале предложения',
			  	isCheck: true,
			  	points: ''
			  },
			  {
			  	title: 'Разделительное написание предлого в с другими словами',
			  	isCheck: true,
			  	points: ''
			  }
		  ]
},
{
	id: 3, title: "Словарные слова", subject: "Русский язык", type: "Словарный диктант", skills:
		  [
			  {
			  	title: 'огород',
			  	isCheck: true,
			  	points: ''
			  },
			  {
			  	title: 'собака',
			  	isCheck: true,
			  	points: ''
			  }
		  ]
}
];

var journal = [];

function PTest(test) {
	this.id = "";
	this.title = test.title;
	this.subject = test.subject;
	this.type = test.type;
	this.skills = test.skills;
	this.date = new Date();
	this.halfYear = this.date.getMonth() < 6 ? 2 : 1;
	this.patisipants = [];
}

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
	self.today = new Date();
	self.chosenDate = new Date();;
	self.currentHalfYear = self.today.getMonth() < 6 ? 2 : 1;
	self.chosenHalfYear = self.chosenDate.getMonth() < 6 ? 2 : 1;
	self.chooseHalfYear = function(index) {self.chosenHalfYear = index;};
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
						newObject: function () {
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
	self.addToJournal = function(test) {
		var modalInstance = $uibModal.open({
			templateUrl: '/Modals/AddTestToJournal',
			controller: 'ModalsController',
			size: 'md',
			resolve: {
				newObject: function() { return new PTest(test);}
				}

		});
		modalInstance.result.then(function (addedTest) {
			addedTest.id = self.baseInfo.journal.length + 1;
			baseInfoService.addTestToJournal(addedTest);
		});

	};

};

var modals = function ($scope, $uibModalInstance, baseInfoService) {
	var self = $scope;
	self.baseInfo = baseInfoService;
	self.newObject = $scope.$resolve.newObject;
	self.save = function () {
		$uibModalInstance.close(self.newObject);
	};
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
};

var datePicker = function ($scope, classService, baseInfoService) {
	$scope.today = function () {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	$scope.inlineOptions = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

	$scope.dateOptions = {
		dateDisabled: disabled,
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};

	// Disable weekend selection
	function disabled(data) {
		var date = data.date,
		  mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}

	$scope.toggleMin = function () {
		$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
		$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	};

	$scope.toggleMin();

	$scope.open1 = function () {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function () {
		$scope.popup2.opened = true;
	};

	$scope.setDate = function (year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.altInputFormats = ['M!/d!/yyyy'];

	$scope.popup1 = {
		opened: false
	};

	$scope.popup2 = {
		opened: false
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.events = [
	  {
	  	date: tomorrow,
	  	status: 'full'
	  },
	  {
	  	date: afterTomorrow,
	  	status: 'partially'
	  }
	];

	function getDayClass(data) {
		var date = data.date,
		  mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}

		return '';
	}
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
	this.journal = journal;
	this.addTestToJournal = function (pTest) {
		journal.push(pTest);
	}
	this.addTest = function (test) {
		tests.push(test);
	}
};


app.service('classService', classService);
app.service('baseInfoService', baseInfoService);
var appController = app.controller('AppController', ['$scope', '$uibModal', 'classService', 'baseInfoService', main]);
var modalsController = app.controller('ModalsController', ['$scope', '$uibModalInstance', 'baseInfoService', modals]);
var datepickerController = app.controller('DatepickerController', ['$scope', 'classService', 'baseInfoService', datePicker]);





