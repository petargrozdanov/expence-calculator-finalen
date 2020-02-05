const express=require('express')

const Item=require('../models/Items.js')



const getAll=(req,res)=>{
     let q={}
    
     let sort={};

      if(req.query.date_from != undefined){
          if(q.purchase_date == undefined){
              q.purchase_date={}
          }
          q.purchase_date.$gte = new Date(Number(req.query.date_from))
      }
      if(req.query.date_to != undefined){
         if(q.purchase_date == undefined){
              q.purchase_date={}
          }
          q.purchase_date.$lte = new Date (Number(req.query.date_to))
      }
      if(req.query.sort != undefined){
         let sortable=['purchase_date','product_price']
         let sq=req.query.sort.split(':')
         if(sortable.indexOf(sq[0]) > -1){
              sort[sq[0]] = sq[1] == 'desc' ? -1 :1
          }
      }
    
    Item.getAll(q,sort)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
}
const getOne = (req, res) => {
    Item.getOne(req.params.id, req.user.id)
    .then(data=> {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}
const save = (req, res) => {
    var data = req.body;
    let er = 0;
    if (data.product_name == undefined || data.product_name.length == 0) { er++; }
    if (data.product_type == undefined || data.product_type.length == 0) { er++; }
    if (data.product_description == undefined || data.product_description.length == 0) { er++; }
    if (data.purchase_date == undefined || data.purchase_date.length == 0) { er++; }
    if (data.product_price== undefined || data.product_price.length == 0) { er++; }
   

    if (er == 0) {
        Item.save({...data,user_id:req.user_id})
            .then(() => {
                res.status(201).send('Created');
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        res.status(400).send('Bad request');
    }
}
const replace = (req, res) => {
    var data = req.body;
    let er = 0;
    if (data.product_name == undefined || data.product_name.length == 0) { er++; }
    if (data.product_type == undefined || data.product_type.length == 0) { er++; }
    if (data.product_description == undefined || data.product_description.length == 0) { er++; }
    if (data.purchase_date == undefined || data.purchase_date.length == 0) { er++; }
    if (data.product_price== undefined || data.product_price.length == 0) { er++; }
   

    if (er == 0) {
        Item.replace(req.params.id, data)
            .then(() => {
                res.status(204).send();
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        res.status(400).send('Bad Request');
    }
}

const update = (req, res) => {
    var data = req.body;
    Item.replace(req.params.id, data) //koe id ke bide vo url toa se brise so ova req.params.id
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const remove = (req, res) => {
    Item.remove(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports={
    getAll,
    getOne,
    save,
    replace,
    update,
    remove
}