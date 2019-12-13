class PartsController < ApplicationController
    def index
        render json: Part.all
    end 

    def show
        part = Part.find(params.require(:id))
        render json: part
      end
    
    def create
        part = Part.create(part_params)
        if part.valid?
          render json: part
        else
          render json: { errors: part.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def update
        part = Part.find(params.require(:id))
        part.update(car_params)
        head :no_content
      end
    
      def destroy
        part = Part.find(params.require(:id))
        part.destroy
        head :no_content
      end 

      private 
      def part_params
        params.require(:car).permit(:part_type, :brand, :version, :details, :rating, :car_id)
      end
end
