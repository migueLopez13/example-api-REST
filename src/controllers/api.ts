import { Application, Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Contact } from "../interfaces/contact.interface";
import contactModel from "../models/contact.model";


export const loadApiRoutes = (app: Application): void => {
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("Bienvenido a la APIREST");
  });

  app.get("/contacts", (req, res) => {
    contactModel.find((err, contacts) => {
      if (err) res.status(500).send(err.message);
      res.status(200).jsonp(contacts);
    })
  });

  app.get("/contact/:id", (req, res) => {
    contactModel.findById(req.params.id,
      (err: CallbackError, contacts: Contact) => {
        if (err) res.status(500).send(err.message);
        res.status(200).jsonp(contacts);
      })
  });

  app.post("/create", (req, res) => {
    var contact = {
      dni: req.body.dni,
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
    } as Contact;
    contact.save((err, contact) => {
      if (err) res.status(500).send(err.message);
      res.status(200).jsonp(contact);
    });
  });

  app.put('/update/:id', (req, res) => {
    contactModel.findById(req.params.id,
      (err: CallbackError, contact: Contact) => {
        contact.dni = req.body.dni;
        contact.name = req.body.name;
        contact.surname = req.body.surname;
        contact.phone = req.body.phone;
        contact.gender = req.body.gender;
        contact.address = req.body.address;

        contact.save((err) => {
          if (err) res.status(500).send(err.message);
          res.status(200).jsonp(contact);
        });
      });
  });

  app.delete('/delete/:id', (req, res) => {
    contactModel.findById(req.params.id,
      (err: CallbackError, contact: Contact) => {
        contact.remove();
      });
  });
};
