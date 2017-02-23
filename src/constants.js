export const MARKS = {
	ONE: 'ONE',
	FIVE: 'FIVE',
	CHANGE: 'CHANGE'
};

export const ALERT_TYPES = {
	ERROR: 'ERROR',
	NOTE: 'NOTE'
};

export const ALERTS = {
	EMPTY_NAME: {
		type: ALERT_TYPES.ERROR,
		message: 'Add a song name enable saving'
	},
	RECORD: {
		type: ALERT_TYPES.ERROR,
		message: 'Press record to begin writing taps'
	},
	SAVE_NOTE: {
		type: ALERT_TYPES.NOTE,
		message: 'Swipe across top to reset. Take a screenshot!'
	}
};
