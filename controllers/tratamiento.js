const tratamiento = async (req,res)=>{
    const {body} = req;
    const data = await sintomasModel.create(body);

    res.json({
        msg:"Succesfull",
        data: data
    })
}

module.exports = {
    tratamiento
}
