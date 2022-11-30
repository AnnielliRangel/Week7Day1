import { Schema, model } from "mongoose";

const processoSchema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
      lowercase: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["Aberto", "Finalizado", "Em Andamento"],
      default: "Aberto",
    },
    details: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 30,
    },
    dateInit: {
      type: Date,
      required: true,
    },
    comments: [
      {
        type: String,
        trim: true,
      },
    ],

    dateEnd: {
      type: Date,
      
    },
    setor: {
      type: String,
      enum: ["TRE", "TRJ", "ENAP"],
      default:"ENAP",
    },
  },
  {
    timestamps: true,
  }
);

const ProcessoModel = model("Processo", processoSchema);

export default ProcessoModel;
