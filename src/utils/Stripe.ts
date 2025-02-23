import stripe from "stripe";
import { getEnvironmentVariables } from "../environments/environment";

const _stripe = new stripe(getEnvironmentVariables().stripe.secret_key, {apiVersion: '2022-11-15'});

export class Stripe {

    private static async createCustomer(name: string, email: string) {
        try {
            const params: stripe.CustomerCreateParams = {
                email: email,
                name: name,
                // source: '',
                // address: {
                //     line1: 'ABC',
                //     postal_code: '',
                //     city: '',
                //     state: '',
                //     country: ''
                // }
                // description: 'test customer',
              };
            
            const customer: stripe.Customer = await _stripe.customers.create(params);
            console.log(customer.id);
            return customer;
        } catch(e) {
            throw(e);
        }
    }

    static async paymentSheet(data: { name: string, email: string, amount: number, currency: string }) {
        try {
            const customer = await Stripe.createCustomer(data.name, data.email);
            const ephemeralKey = await _stripe.ephemeralKeys.create(
                { customer: customer.id },
                { apiVersion: '2020-08-27' }
            );
            const paymentIntent = await _stripe.paymentIntents.create({
                amount: data.amount,
                currency: data.currency,
                customer: customer.id,
                automatic_payment_methods: {
                enabled: true,
                },
            });

            const response = {
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id
            };
            return response;
        } catch(e) {
            throw(e);
        }
    }

}