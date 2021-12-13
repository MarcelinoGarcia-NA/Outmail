import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';

export default function RouteWrapper({ component: Component, isPrivate = false, ...rest }) {

   const signed = !!localStorage.getItem("@PROJECTEMAIL/token");

   if (!signed && isPrivate) {
      return <Redirect to="/" />
   }
   
   if (!signed && isPrivate) {
      return <Redirect to="/login" />
   }
   
   return <Route {...rest} component={Component} />;
};