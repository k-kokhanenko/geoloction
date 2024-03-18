import ModalDialog from './ModalDialog';

export default class TimeLine {
	constructor(timelineClass, timelineInputClass) {
		this.records = [];
		this.timelineClass = timelineClass;

		if (timelineClass && timelineInputClass) {			
			this.timeline = document.querySelector(timelineClass.charAt(0) != '.' ? `.${timelineClass}` : timelineClass);
			this.input = document.querySelector(timelineInputClass.charAt(0) != '.' ? `.${timelineInputClass}` : timelineInputClass);

			if (this.timeline && this.timelineClass) {
				const storage = sessionStorage.getItem(this.timelineClass);
				if (storage) {
					this.records = JSON.parse(storage);
					this.updateTimeline(true);
				}
			}	

			if (this.input) {
				this.input.addEventListener('keydown', this.onAddNewRecord.bind(this));
			}			
		}
	}

	setNewGeoPositions(lat, long) {
		this.lat = lat;		
		this.long = long;
		this.addNewRecord();		
	}

	addNewRecord() {
		const newRecord = `${this.input.value}<br>[${this.lat}, ${this.long}]`;
		this.records.unshift(newRecord);

		sessionStorage.setItem(this.timelineClass, JSON.stringify(this.records));
		this.updateTimeline();		
	}

	onAddNewRecord(event) {		
		if (event.keyCode === 13 || event.key === 'Enter') {
			if (navigator.geolocation) {
				if (this.lat != undefined && this.long != undefined) {
					this.addNewRecord();
				} else {					
					navigator.geolocation.getCurrentPosition(position => {
						const {latitude, longitude} = position.coords;
						this.lat = latitude;
						this.long = longitude;
						this.addNewRecord();
					}, function(err) {				
						console.log(err);
						/* eslint-disable no-unused-vars */
						const modal = new ModalDialog(this.setNewGeoPositions.bind(this));
					}.bind(this));
				}
			} else {
				alert('error');
			}
		}
	}

	updateTimeline(all = false) {
		if (this.records.length > 0 && this.timeline) {
			if (all) {
				for (let i=this.records.length-1; i > 0; i--) {
					this.timeline.insertAdjacentHTML('afterbegin', `<div class='timeline-item'>${this.records.at(i)}</div>`);
				}
			} else {
				this.timeline.insertAdjacentHTML('afterbegin', `<div class='timeline-item'>${this.records.at(0)}</div>`);
			}

			this.input.selectionStart = 0;
			this.input.value = '';
		}
	}
}
