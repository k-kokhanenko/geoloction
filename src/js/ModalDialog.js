export default class ModalDialog {
	static checkCoordinates(coordinates) {
		// убираем лишние пробелы
		coordinates = coordinates.replace(/\s+/g, '');

		// Удаляем лишние скобки
		/* eslint-disable no-useless-escape */
		coordinates = coordinates.replace(/[\[\]']+/g,'');

		// Определяем количество точек их должно быть две
		const pointCount = coordinates.split(",");
		if (pointCount.length != 2) {
			throw new Error('Incorrect input value.');
		}

		return {
			lat:  pointCount[0],
			long: pointCount[1]
		};
	}

	constructor(callback) {
		document.body.insertAdjacentHTML('afterbegin', '<dialog style="padding: 0"><div id="modal-box" style="padding: 5px;"><div>Specify your coordinates</div><div><input class="coordinates"/></div><button id="close-modal-btn">Save</button></div></dialog>');

		const modal = document.querySelector('dialog');
		const closeModalBtn = document.getElementById('close-modal-btn');

		/* eslint-disable no-unused-vars */
		let isModalOpen = true;
		modal.showModal();

		closeModalBtn.addEventListener('click', () => {
			modal.close();
			isModalOpen = false;

			if (callback) {
				const coordinates = document.querySelector('.coordinates');
				try {
					const obj = this.checkCoordinates(coordinates.value);
					callback(obj.lat, obj.long);
				} catch (error) {
					alert(error);
				}
			}
		})			
	}

	init(callback) {
		callback();
	}
}
