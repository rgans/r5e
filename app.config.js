var path = require('path');

var config = {
    
    repository: {
        r5e: {
            options: { replset: { socketOptions: { connectTimeoutMS : 50 }}},
            address: 'localhost',
            name: 'r5e',
            cnnString: 'mongodb://localhost/r5e'
        }
    },
    
    path: {
        repository: {
            r5e: path.join(__dirname, 'database/r5e/repository')
        },
        
        security: {
            authorize: path.join(__dirname, 'security/authorize')
        },
        
        entity: {
            r5e: {
                contact: path.join(__dirname, 'database/r5e/contact_entity'),
                message: path.join(__dirname, 'database/r5e/message_entity'),
                message_report: path.join(__dirname, 'database/r5e/message_report_entity'),
                user: path.join(__dirname, 'database/r5e/user_entity')
            }
        },
        
        routes: {
            index: path.join(__dirname, 'routes/index'),
            logger: path.join(__dirname, 'routes/logger')
        }
    }
    
};

module.exports = config;