/* eslint-disable camelcase */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import params from '../utils/songsterQueryParameters';
// import dotenv from 'dotenv';

// dotenv.config();

const spotifyAuth = `https://accounts.spotify.com/authorize?client_id=${params.client_id}&scope=${params.scope}&response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&state=${params.state}`;

export const redirectController = (req: Request, res: Response) => {
  res.redirect(spotifyAuth);
};

export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;
  const reqData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: params.redirect_uri,
  };

  const encodedAuthToken = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64');
  const reqConfig = {
    headers: {
      Authorization: `Basic ${encodedAuthToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const {
      data: { refresh_token, access_token },
    } = await axios.post(
      `https://accounts.spotify.com/api/token`,
      new URLSearchParams(reqData),
      reqConfig
    );
    const { data: userData } = await axios.get(
      `https://api.spotify.com/v1/me`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    res.json({ refresh_token, userData });
  } catch (err: any) {
    if (
      err?.response?.data === 'User not registered in the Developer Dashboard'
    ) {
      res.status(403).send({
        error: err,
        status: 403,
      });
    } else next(err);
  }
};

export const sendTestUserTokenController = (req: Request, res: Response) => {
  const refresh_token =
    'AQDn1bKlGv-FiQ2hJ8VEkaS29Qd2quXI8qmnyVhqm2OO78ZshcR8vIXkqNYPPKvl8GKFNdA0gL3_dv8aEki-tJnFu8oPSGLpRLP9UmO1jdnERFe-rkClOEO0EFeRvbXNuwI';
  const userData = {
    display_name: 'TestUser',
    external_urls: {
      spotify: 'https://open.spotify.com/user/0bqpqp05sgu2gyvqbjp5ox5uv',
    },
    followers: { href: null, total: 0 },
    href: 'https://api.spotify.com/v1/users/0bqpqp05sgu2gyvqbjp5ox5uv',
    id: '0bqpqp05sgu2gyvqbjp5ox5uv',
    images: [],
    type: 'user',
    uri: 'spotify:user:0bqpqp05sgu2gyvqbjp5ox5uv',
  };

  res.json({ refresh_token, userData });
  console.log('================================================== path called');
};

export const sendEmailController = (req: Request, res: Response) => {
  console.log(req.body);

  const nodemailer = require('nodemailer');

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_NAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Spotify Tab Finder" <rosa_michal@outlook.com>', // sender address
      to: 'michalrosa17@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: req.body.formValue, // plain text body
      // html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
