
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ResponseFact } from './response-fact.interface';
import { AxiosResponse } from 'axios';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly httpService: HttpService) {}

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 60 seconds');

    this.sendDocument();    
  }

  async sendDocument() {
    const { data } = await this.httpService.axiosRef
    .post<ResponseFact>('http://demo1.comprobantesjr.com/api/documents',
    {
      "serie_documento": "F001",
      "numero_documento": "13",
      "fecha_de_emision": "2024-04-04",
      "hora_de_emision": "10:11:11",
      "codigo_tipo_operacion": "0101",
      "codigo_tipo_documento":"01",
      "codigo_tipo_moneda": "PEN",
      "fecha_de_vencimiento":"2024-04-04",
      
      "nombre_almacen": "Almacen 1",
      "datos_del_emisor": {
        "codigo_del_domicilio_fiscal": "0000"
      },
      "datos_del_cliente_o_receptor":{
        "codigo_tipo_documento_identidad": "6",
        "numero_documento": "10418540341",
        "apellidos_y_nombres_o_razon_social": "DEVPRO",
        "codigo_pais": "PE",
        "ubigeo": "150101",
        "direccion": "Av.",
        "correo_electronico": "demo@gmail.com",
        "telefono": "427-1148"
      },
      "totales": {
        "total_exportacion": 0.00,
        "total_operaciones_gravadas": 100.00,
        "total_operaciones_inafectas": 0.00,
        "total_operaciones_exoneradas": 0.00,
        "total_operaciones_gratuitas": 0.00,
        "total_igv": 18.00,
        "total_impuestos": 18.00,
        "total_valor": 100,
        "total_venta": 118
      },
      "items":[
        {
          "codigo_interno": "P0121",
          "descripcion":"Inca Kola 250 ml",
          "codigo_producto_sunat": "51121703",
          "unidad_de_medida": "NIU",
          "cantidad": 2,
          "valor_unitario": 50,
          "codigo_tipo_precio": "01",
          "precio_unitario": 59,
          "codigo_tipo_afectacion_igv": "10",
          "total_base_igv": 100.00,
          "porcentaje_igv": 18,
          "total_igv": 18,
          "total_impuestos": 18,
          "total_valor_item": 100,
          "total_item": 118
        }
      ],
      "numero_orden_de_compra": "0045467898",
      "codigo_condicion_de_pago": "02",
      "cuotas": [
          {
            "fecha": "2024-04-14",
            "codigo_tipo_moneda": "PEN",
            "monto": 118,
            "codigo_metodo_de_pago": "05"
          }
      ],
      "guias": [
          {
            "numero": "EG07-00089",
            "codigo_tipo_documento": "09"
          }
      ],
      "retencion": {
        "codigo": "62",
        "porcentaje": 0.03,
        "monto": 4.05,
        "base": 118,
        "currency_type_id": "PEN",
        "exchange_rate": 1,
        "amount_pen": 4.05,
        "amount_usd": 4.05
      }
    }
    ,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ 'mDDWoxA2RJkyDznbl63I1ygNTMOaS3mPelDrh89K0HziDbGXsr'
      }
    })
    .catch((error) => {
          //this.logger.error(error.response.data);
          return {
            data: {
              success: error.response.data.success,
              message: error.response.data.message,
            }
          } as AxiosResponse<ResponseFact>;
       })
     ;

     this.logger.warn(data);
  }

  /*
  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

  async findAll(): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cat[]>('http://localhost:3000/cats').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  */
}
