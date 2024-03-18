import ModalDialog from '../ModalDialog.js';

test('check coordinates values 1', () => {  
    const result = ModalDialog.checkCoordinates('51.50851, 0.12572');
    expect(result).toEqual({ lat: '51.50851', long: '0.12572' });
});

test('check coordinates values 2', () => {  
  const result = ModalDialog.checkCoordinates('[51.50851,0.12572]');
  expect(result).toEqual({ lat: '51.50851', long: '0.12572' });
});

test('check coordinates values 3', () => {  
  expect(() => {
    ModalDialog.checkCoordinates('[12.345]');
  }).toThrow('Incorrect input value.');
});

test('check coordinates values 4', () => {  
  expect(() => {
    ModalDialog.checkCoordinates('12.345, 67.890, 89.012');
  }).toThrow('Incorrect input value.');
});