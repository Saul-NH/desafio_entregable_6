const Message =  require('../clases/Message');
const message = new Message('./src/data/messages.txt');

const getAllMessages = async(req, res) => {
    try {
        res.json({
            messages: await message.getAll()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const createMessage = async(req, res) => {
    try {
        const messageCreated = await message.save(req.body);
        res.json({
            'message': messageCreated
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    createMessage,
    getAllMessages
}