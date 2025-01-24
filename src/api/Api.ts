/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface Responses {
  /** Id response */
  id_response?: number;
  /**
   * Creator
   * @minLength 1
   */
  creator?: string;
  /**
   * Moderator
   * @minLength 1
   */
  moderator?: string;
  /** Status */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Deleted at
   * @format date-time
   */
  deleted_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /** Name human */
  name_human?: string | null;
  /** Education */
  education?: string | null;
  /** Experience */
  experience?: string | null;
  /** Peculiarities comm */
  peculiarities_comm?: string | null;
  /**
   * Interview date
   * @format date-time
   */
  interview_date?: string | null;
  /** @uniqueItems true */
  vacancies?: number[];
}

export interface Vacancies {
  /** Vacancy id */
  vacancy_id?: number;
  /**
   * Vacancy name
   * @minLength 1
   * @maxLength 255
   */
  vacancy_name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Money from
   * @min -2147483648
   * @max 2147483647
   */
  money_from?: number;
  /**
   * Money to
   * @min -2147483648
   * @max 2147483647
   */
  money_to?: number;
  /**
   * Url
   * @maxLength 1024
   */
  url?: string | null;
  /**
   * City
   * @minLength 1
   * @maxLength 255
   */
  city?: string;
  /**
   * Name company
   * @minLength 1
   * @maxLength 255
   */
  name_company?: string;
  /**
   * Peculiarities
   * @minLength 1
   */
  peculiarities?: string;
}

export interface ResponsesVacancies {
  /** Vacancy id */
  vacancy_id?: string;
  /**
   * Vacancy name
   * @minLength 1
   */
  vacancy_name: string;
  /** Money from */
  money_from: number;
  /** Money to */
  money_to: number;
  /**
   * Url
   * @minLength 1
   */
  url: string;
  /**
   * City
   * @minLength 1
   */
  city: string;
  /**
   * Name company
   * @minLength 1
   */
  name_company: string;
  /**
   * Peculiarities
   * @minLength 1
   */
  peculiarities: string;
  /** Request */
  request: number;
  /** Quantity */
  quantity: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (
      data: {
        /** Имя пользователя */
        username: string;
        /** Пароль пользователя */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        User,
        | {
            /** @example false */
            success?: boolean;
            /** @example "Неверное имя пользователя или пароль." */
            error?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Ошибка в данных пользователя." */
            error?: string;
          }
      >({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags login
     * @name LoginUpdateUserUpdate
     * @request PUT:/login/{user_id}/update_user/
     * @secure
     */
    loginUpdateUserUpdate: (userId: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/${userId}/update_user/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  responses = {
    /**
     * No description
     *
     * @tags responses
     * @name ResponsesList
     * @request GET:/responses/
     * @secure
     */
    responsesList: (
      query?: {
        /** Статус заявки. */
        status?: number;
        /**
         * Начальная дата подачи заявки (в формате YYYY-MM-DDTHH:MM:SS).
         * @format date-time
         */
        date_submitted_start?: string;
        /**
         * Конечная дата подачи заявки (в формате YYYY-MM-DDTHH:MM:SS).
         * @format date-time
         */
        date_submitted_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Уникальный идентификатор заявки. */
          id_response?: number;
          /** Статус заявки: 1 - 'Черновик', 2 - 'Удалена', 3 - 'Сформирована', 4 - 'Завершена', 5 - 'Отклонена'. */
          status?: number;
          /**
           * Дата и время создания заявки.
           * @format date-time
           */
          created_at: string;
          /** Имя пользователя, который создал заявку. */
          creator: string;
          /** Имя модератора, обработавшего заявку (если есть). */
          moderator?: string | null;
          /**
           * Дата и время завершения заявки (если была завершена).
           * @format date-time
           */
          completed_at?: string | null;
          /**
           * Дата и время удаления заявки (если была удалена).
           * @format date-time
           */
          deleted_at?: string | null;
          /** ФИО кандидата. */
          name_human?: string | null;
          /** Образование. */
          education?: string | null;
          /** Опыт работы. */
          experience?: string | null;
          /** Особенности кандидата. */
          peculiarities_comm?: string | null;
          /** Дата интервью. */
          interview_date?: string | null;
        }[],
        any
      >({
        path: `/responses/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesRead
     * @request GET:/responses/{id_response}/
     * @secure
     */
    responsesRead: (idResponse: string, params: RequestParams = {}) =>
      this.request<
        {
          responses?: {
            /** Уникальный идентификатор заявки. */
            id_response?: number;
            /** Статус заявки. */
            status?: number;
            /**
             * Дата и время создания заявки.
             * @format date-time
             */
            created_at?: string;
            /** Имя пользователя, создавшего заявку. */
            creator?: string;
            /** Имя модератора заявки (если есть). */
            moderator?: string | null;
            /**
             * Дата завершения заявки.
             * @format date-time
             */
            completed_at?: string | null;
            /**
             * Дата удаления заявки.
             * @format date-time
             */
            deleted_at?: string | null;
            /** ФИО кондидата. */
            name_human?: string | null;
            /** Образование. */
            education?: string | null;
            /** Опыт работы. */
            experience?: string | null;
            /** Особенности кондидата. */
            peculiarities_comm?: string | null;
            /**
             * Дата интервью.
             * @format date-time
             */
            interview_date?: string | null;
          };
          /** Список вакансий, привязанных к заявке. */
          vacancies?: {
            vacancy_id?: {
              vacancy_id?: number;
              vacancy_name: string;
              money_from: number;
              money_to: number;
              city: string;
              name_company: string;
              peculiarities: string;
              url?: string;
            };
            /** Количество записей для данноq вакансии. */
            count?: number;
          }[];
        },
        {
          /** Сообщение об ошибке. */
          Ошибка?: string;
        }
      >({
        path: `/responses/${idResponse}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesDeleteResponseDelete
     * @request DELETE:/responses/{id_response}/delete_response/
     * @secure
     */
    responsesDeleteResponseDelete: (idResponse: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/responses/${idResponse}/delete_response/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesUpdateStatusAdminUpdate
     * @request PUT:/responses/{id_response}/update_status_admin/
     * @secure
     */
    responsesUpdateStatusAdminUpdate: (
      idResponse: string,
      data: {
        /**
         * Новый статус заявки (4 - Завершена, 5 - Отклонена)
         * @example 4
         */
        status: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Responses,
        | {
            /** @example "Неверные данные или обязательные поля не заполнены." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание отклика не найдена." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка ещё не сформирована или статус не разрешён." */
            Ошибка?: string;
          }
      >({
        path: `/responses/${idResponse}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesUpdateStatusUserUpdate
     * @request PUT:/responses/{id_response}/update_status_user/
     * @secure
     */
    responsesUpdateStatusUserUpdate: (idResponse: string, params: RequestParams = {}) =>
      this.request<
        Responses,
        | {
            /** @example "Не заполнены данные об отклике." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание отклика не найдена." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявку нельзя изменить, так как она не в статусе 'Черновик'." */
            Ошибка?: string;
          }
      >({
        path: `/responses/${idResponse}/update_status_user/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesUpdateVacancyUpdate
     * @request PUT:/responses/{id_response}/update_vacancy/
     * @secure
     */
    responsesUpdateVacancyUpdate: (
      idResponse: string,
      data: {
        /** @example "Якимова Татьяна Сергеевна" */
        name_human?: string;
        /** @example "МГТУ им.Баумана, бакалавриат" */
        education?: string;
        /** @example "3 года опыта работы с Java" */
        experience?: string;
        /** @example "Нарушение слуха" */
        peculiarities_comm?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Responses,
        | {
            /** @example "Нет данных для обновления или поля не разрешены." */
            Ошибка?: string;
          }
        | {
            /** @example "Заявка на создание вакансии не найдена." */
            Ошибка?: string;
          }
      >({
        path: `/responses/${idResponse}/update_vacancy/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  vacancies = {
    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesList
     * @request GET:/vacancies/
     * @secure
     */
    vacanciesList: (
      query?: {
        /** Название вакансии для фильтрации */
        vacancy_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          vacancies: {
            vacancy_id?: number;
            vacancy_name: string;
            description: string;
            money_from: number;
            money_to: number;
            city: string;
            name_company: string;
            peculiarities: string;
            url?: string;
          }[];
          draft_responses?: number | null;
          count?: number | null;
        },
        any
      >({
        path: `/vacancies/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesCreateVacancyCreate
     * @request POST:/vacancies/create_vacancy/
     * @secure
     */
    vacanciesCreateVacancyCreate: (data: Vacancies, params: RequestParams = {}) =>
      this.request<Vacancies, any>({
        path: `/vacancies/create_vacancy/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesRead
     * @request GET:/vacancies/{vacancy_id}/
     * @secure
     */
    vacanciesRead: (vacancyId: string, params: RequestParams = {}) =>
      this.request<
        {
          vacancy_id?: number;
          vacancy_name: string;
          description: string;
          money_from: number;
          money_to: number;
          city: string;
          name_company: string;
          peculiarities: string;
          url?: string;
        },
        any
      >({
        path: `/vacancies/${vacancyId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesAddToResponseCreate
     * @request POST:/vacancies/{vacancy_id}/add_to_response/
     * @secure
     */
    vacanciesAddToResponseCreate: (vacancyId: string, params: RequestParams = {}) =>
      this.request<
        {
          responses?: {
            /** Уникальный идентификатор заявки. */
            id_response?: number;
            /** Статус заявки. */
            status?: number;
            /**
             * Дата и время создания заявки.
             * @format date-time
             */
            created_at?: string;
            /** Имя пользователя, создавшего заявку. */
            creator?: string;
            /** Имя модератора заявки (если есть). */
            moderator?: string | null;
            /**
             * Дата завершения заявки.
             * @format date-time
             */
            completed_at?: string | null;
            /**
             * Дата удаления заявки.
             * @format date-time
             */
            deleted_at?: string | null;
            /** ФИО кондидата. */
            name_human?: string | null;
            /** Образование. */
            education?: string | null;
            /** Опыт работы. */
            experience?: string | null;
            /** Особенности кондидата. */
            peculiarities_comm?: string | null;
            /**
             * Дата интервью.
             * @format date-time
             */
            interview_date?: string | null;
          };
          /** Список вакансий, привязанных к заявке. */
          vacancies?: {
            vacancy_id?: {
              vacancy_id?: number;
              vacancy_name: string;
              description: string;
              money_from: number;
              money_to: number;
              city: string;
              name_company: string;
              peculiarities: string;
              url?: string;
            };
            /** Количество записей для данной вакансии . */
            count?: number;
          }[];
        },
        any
      >({
        path: `/vacancies/${vacancyId}/add_to_response/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesDeleteVacancyDelete
     * @request DELETE:/vacancies/{vacancy_id}/delete_vacancy/
     * @secure
     */
    vacanciesDeleteVacancyDelete: (vacancyId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vacancies/${vacancyId}/delete_vacancy/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesEditVacancyUpdate
     * @request PUT:/vacancies/{vacancy_id}/edit_vacancy/
     * @secure
     */
    vacanciesEditVacancyUpdate: (vacancyId: string, data: Vacancies, params: RequestParams = {}) =>
      this.request<Vacancies, any>({
        path: `/vacancies/${vacancyId}/edit_vacancy/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies
     * @name VacanciesUpdateImageCreate
     * @request POST:/vacancies/{vacancy_id}/update_image/
     * @secure
     */
    vacanciesUpdateImageCreate: (
      vacancyId: string,
      data: {
        /**
         * Новое изображение для вакансии.
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Vacancies,
        | {
            /** @example "Изображение не предоставлено." */
            Ошибка?: string;
          }
        | {
            /** @example "Вакансия не найдена." */
            Ошибка?: string;
          }
      >({
        path: `/vacancies/${vacancyId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  vacanciesResponses = {
    /**
     * No description
     *
     * @tags vacancies_responses
     * @name VacanciesResponsesDeleteVacancyFromResponseDelete
     * @request DELETE:/vacancies_responses/{mm_id}/delete_vacancy_from_response/
     * @secure
     */
    vacanciesResponsesDeleteVacancyFromResponseDelete: (mmId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vacancies_responses/${mmId}/delete_vacancy_from_response/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vacancies_responses
     * @name VacanciesResponsesUpdateResponseUpdate
     * @request PUT:/vacancies_responses/{mm_id}/update_response/
     * @secure
     */
    vacanciesResponsesUpdateResponseUpdate: (
      mmId: string,
      data: {
        /**
         * Количество откликов для данной вакансии в заявке.
         * @example 1
         */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ResponsesVacancies,
        | {
            /** @example "Количество не предоставлено" */
            Ошибка?: string;
          }
        | {
            /** @example "You do not have permission to perform this action." */
            detail?: string;
          }
        | {
            /** @example "Связь между вакансией откликом не найдена" */
            Ошибка?: string;
          }
      >({
        path: `/vacancies_responses/${mmId}/update_response/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
