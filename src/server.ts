import App from './app';
import CustomersRoute from 'routes/customers.route';
import TransactionsRoute from 'routes/transaction.route';

const app = new App([new CustomersRoute(), new TransactionsRoute()]);

app.listen();
