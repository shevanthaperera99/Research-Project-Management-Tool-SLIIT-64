const USER_TYPE = {
    ADMIN: 1,
    STUDENT: 2,
    SUPERVISOR: 3,
    PANEL_MEMBER: 4,
}

const STATUS_TYPE = {
    WAITING_FOR_APPROVAL: 1,
    ACCEPTED: 2,
    REJECTED: 3
}

const REQUEST_TYPE = {
    TOPIC_REGISTRATION: 1,
    CO_SUPERVISOR_REGISTRATION: 2
}

const SUBMISSION_TYPE = {
    TOPIC_EVALUATION: 1,
    PROJECT_PROPOSAL_PRESENTATION: 2,
    FINAL_THESIS: 3
}

const API_BASE_URL = 'http://localhost:3000/api';
const API_FILE_URL = 'http://localhost:3000/documents';

module.exports = {
    USER_TYPE: USER_TYPE,
    API_BASE_URL: API_BASE_URL,
    API_FILE_URL: API_FILE_URL,
    STATUS_TYPE: STATUS_TYPE,
    REQUEST_TYPE: REQUEST_TYPE,
    SUBMISSION_TYPE: SUBMISSION_TYPE
}