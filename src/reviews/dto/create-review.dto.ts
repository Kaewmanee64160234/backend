export class CreateReviewDto {
  rev_id?: number;

  rev_star_clean: number;

  rev_star_service: number;

  rev_star_conv: number;

  rev_comment: string;

  rev_date: Date;
}
