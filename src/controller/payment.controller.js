
const paymentService = require("../services/paymentService.js");

const createPaymentLink = async (req, res) => {
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id);
        return res.status(200).send(paymentLink);
    } catch (error) {
        console.log("createPaymentLink error controller : ",error);
        return res.status(500).send({ error: error.message });
    }
}

const updatePaymentInformation = async (req,res)=>{
    try {
        await paymentService.updatePaymentInformation(req.query);
        return res.status(200).send({message:"Payment Information Updated Successfully", status:true}); 

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
};
