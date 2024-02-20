class CreateReceiptDetailDto{
  
  recd_adult: string;
  recd_child: string;
  recd_total_price: number;
  roomId: number;
  roomTypeId: number;

}
export class CreateReceiptDto {

  rec_cash_pledge: number;
  rec_payment_booking: string;
  customerId: number;
  employeeId: number;
  receiptdetail: CreateReceiptDetailDto[];
  createDate

  // promotionId: number;

}
