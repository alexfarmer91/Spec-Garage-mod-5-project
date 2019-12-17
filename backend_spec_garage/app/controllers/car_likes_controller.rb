class CarLikesController < ApplicationController
    def index
        render json: CarLike.all
    end 

    def show
        like = CarLike.find(params.require(:id))
        render json: like
      end
    
    def create
        like = CarLike.create(car_like_params)
        if like.valid?
          render json: like
        else
          render json: { errors: car.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def destroy
        like = CarLike.find(params.require(:id))
        like.destroy
        head :no_content
      end 

      private 
      def car_like_params
        params.require(:car_like).permit(:car_id, :user_id)
      end
end
