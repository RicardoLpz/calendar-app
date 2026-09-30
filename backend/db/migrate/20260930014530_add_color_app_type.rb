class AddColorAppType < ActiveRecord::Migration[7.2]
  def change
    add_column :appointment_types, :color, :string, default: '#1976D2', null: false
  end
end
