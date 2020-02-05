const mongoose=require('mongoose')

const Item=mongoose.model(
    'items',
    new mongoose.Schema(
        {
            product_name:String,
            product_type:String,
            product_description:String,
            purchase_date:Date,
            product_price:Number,
            user_id:String,
            _created:Date,
            _modified:Date
              
 
        })
);

const getAll = (q,sort)=>{
    return new Promise((success,fail)=>{
        Item.find(q,{},{sort:sort},(err,data)=>{
            if(err){
                return fail(err)
            }
            return success(data)
        })
    })
}
const getOne = (id, userID) => {
    return new Promise((success, fail) => {
        Item.find({ _id: id, user_id: userID }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};
const save=(data)=>{
    return new Promise((success,fail)=>{
        var i=new Item(data)
        i.save(data,err=>{
            if(err){
                return fail(err)
            }
            return success()
        })
    })
}
const replace = (id, data) => {
    return new Promise((success, fail) => {
        Item.findByIdAndUpdate({_id:id} , data, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
}
const update = (id, data) => {
    return new Promise((success, fail) => {
        Product.findByIdAndUpdate(id, {$set: {data}}, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};


const remove = (id) => {
    return new Promise((success, fail) => {
        Item.findByIdAndRemove( {_id:id} , err => {  
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
}

module.exports={
    getAll,
    save,
    getOne,
    remove,
    replace,
    update
}
