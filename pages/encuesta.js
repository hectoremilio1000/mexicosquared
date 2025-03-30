import React, { useState } from "react";
import dynamic from "next/dynamic";
import { message } from "antd";

import axios from "axios";

import { Form, Steps, Button, Input, Select } from "antd";

const { Step } = Steps;
const { Option } = Select;

function Encuesta() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const next = () => {
    form
      .validateFields()
      .then(() => {
        form.validateFields().then((values) => {
          setFormData({ ...formData, ...values });
          setCurrent(current + 1);
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost/api/survey",
        formData
      );
      const recommendations = response.data.recommendations;
      message.success("Encuesta enviada con éxito");
      console.log("Recomendaciones:", recommendations);
    } catch (error) {
      console.error("Error al enviar la encuesta:", error);
      message.error("Error al enviar la encuesta");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>hola</p>
      <Steps current={current}>
        <Step title="Información Básica" />
        <Step title="Detalles Operacionales" />
        <Step title="Clientes y Marketing" />
        <Step title="Finanzas y Objetivos" />
      </Steps>
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: "20px" }}
        initialValues={formData}
      >
        {current === 0 && (
          <div>
            <Form.Item
              name="restaurantName"
              label="Nombre del Restaurante"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del restaurante!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="location"
              label="Ubicación"
              rules={[
                { required: true, message: "Por favor ingrese la ubicación!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cuisineType"
              label="Tipo de Cocina"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el tipo de cocina!",
                },
              ]}
            >
              <Select>
                <Option value="italian">Italiana</Option>
                <Option value="mexican">Mexicana</Option>
                <Option value="chinese">China</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="numberOfTables"
              label="Número de Mesas"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el número de mesas!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="operationHours"
              label="Horario de Operación"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el horario de operación!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        )}
        {current === 1 && (
          <div>
            <Form.Item
              name="numberOfEmployees"
              label="Número de Empleados"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el número de empleados!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="menuType"
              label="Tipo de Menú"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el tipo de menú!",
                },
              ]}
            >
              <Select>
                <Option value="a_la_carte">A la Carta</Option>
                <Option value="buffet">Buffet</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="reservationMethod"
              label="Método de Reservas"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el método de reservas!",
                },
              ]}
            >
              <Select>
                <Option value="phone">Teléfono</Option>
                <Option value="online">En Línea</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="posSystem"
              label="Sistema POS"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el sistema POS!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="inventoryManagement"
              label="Gestión de Inventarios y Proveedores"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese cómo gestionan inventarios y proveedores!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        )}
        {current === 2 && (
          <div>
            <Form.Item
              name="targetAudience"
              label="Público Objetivo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el público objetivo!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="marketingStrategies"
              label="Estrategias de Marketing"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese las estrategias de marketing!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="socialMediaPresence"
              label="Presencia en Redes Sociales"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese las redes sociales!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customerFeedback"
              label="Gestión de Reseñas y Feedback"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese cómo gestionan las reseñas y feedback!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="loyaltyPrograms"
              label="Programas de Fidelización"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los programas de fidelización!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        )}
        {current === 3 && (
          <div>
            <Form.Item
              name="averagePrice"
              label="Rango de Precios Promedio"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el rango de precios promedio!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="financialChallenges"
              label="Desafíos Financieros"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los desafíos financieros!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shortTermGoals"
              label="Objetivos a Corto Plazo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los objetivos a corto plazo!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="longTermGoals"
              label="Objetivos a Largo Plazo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los objetivos a largo plazo!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="desiredChanges"
              label="Cambios o Mejoras Deseadas"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese los cambios o mejoras deseadas!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => prev()}
            disabled={current === 0}
            style={{ marginRight: 8 }}
          >
            Anterior
          </Button>
          {current < 3 && (
            <Button type="primary" onClick={() => next()}>
              Siguiente
            </Button>
          )}
          {current === 3 && (
            <Button type="primary" onClick={() => handleFinish()}>
              Enviar
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Encuesta;
