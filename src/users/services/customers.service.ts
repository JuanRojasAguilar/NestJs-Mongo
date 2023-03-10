import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById({ id: id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
