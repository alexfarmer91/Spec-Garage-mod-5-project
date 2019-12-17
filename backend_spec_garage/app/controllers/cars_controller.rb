class CarsController < ApplicationController
    def index
        render json: Car.all
    end 

    def show
        car = Car.find(params.require(:id))
        render json: car
      end
    
    def create
        car = Car.create(car_params)
        if car.valid?
          render json: car
        else
          render json: { errors: car.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def update
        car = Car.find(params.require(:id))
        car.update(car_params)
        render json: car
      end
    
      def destroy
        car = Car.find(params.require(:id))
        car.destroy
        head :no_content
      end 

      private 
      def car_params
        params.require(:car).permit(:year, :make, :model, :details, :nickname, :user_id)
      end
end
