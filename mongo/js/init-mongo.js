db.getSiblingDB('mymongodb')
    .createUser({
        user: 'root',
        pwd: '123456',
        roles: ['readWrite']
});
