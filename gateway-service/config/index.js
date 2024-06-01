require('dotenv').config()

module.exports = {
    BASE_URL : process.env.BASE_URL,
    USER_PORT : process.env.USER_PORT,
    GATEWAY_PORT : process.env.GATEWAY_PORT,
    BATCH_PORT : process.env.BATCH_PORT,
    CONTENT_PORT : process.env.CONTENT_PORT,
    ASSIGNMENT_PORT : process.env.ASSIGNMENT_PORT,
    ROOM_PORT : process.env.ROOM_PORT,
    COURSE_PORT : process.env.COURSE_PORT,
    TEST_PORT : process.env.TEST_PORT,
}