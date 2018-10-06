import { Injectable } from '@dilta/core';
import { Signale } from 'signale';
import * as signale from 'signale';
import { format } from 'date-fns';

/**
 * logging interface for logs
 *
 * @export
 * @interface Log
 */
export interface Log {
  /**
   * Module which serve has the scope for the logger
   *
   * @type {string}
   * @memberof Log
   */
  module?: string;
  /**
   * a string containging the loacation of the log
   * i.e LogComponent or LogService
   *
   * @type {string}
   * @memberof Log
   */
  trace: string;
  /**
   * custom log message passed to the object
   *
   * @type {string}
   * @memberof Log
   */
  message: string;
}

/**
 * a wrapper along js logger
 *
 * @export
 * @class LoggerService
 */
@Injectable()
export class Logger {
  private signale = signale;
  public logger;

  public readonly loggerNameSpace = process.env.LOGGER_NAME_SPACE || 'dilta';
  public readonly loglevel = process.env.LOGGER_LEVEL;

  constructor() {
    this.logger = new Signale({ scope: this.loggerNameSpace });
  }

  /**
   * returns formated time stamps
   *
   * @returns
   * @memberof Logger
   */
  currentTime() {
    return format(Date.now(), 'YYYY-MM-DDTHH:mm:ss');
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  debug(customLog: Log, ...other: any[]) {
    this.scope(customLog).debug.apply(null, this.format(customLog, other));
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  log(customLog: Log, ...other: any[]) {
    return this.scope(customLog).log.apply(null, this.format(customLog, other));
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  warn(customLog: Log, ...other: any[]) {
    this.scope(customLog).warn.apply(null, this.format(customLog, other));
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  info(customLog: Log, ...other: any[]) {
    this.scope(customLog).info.apply(null, this.format(customLog, other));
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  error(customLog: Log, ...other: any[]) {
    this.scope(customLog).error.apply(null, this.format(customLog, other));
  }

  /**
   * validates if the log is a valid log object
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  validate(customLog: Log) {
    if (
      !customLog ||
      typeof customLog.message !== 'string' ||
      typeof customLog.trace !== 'string'
    ) {
      throw logError;
    }
  }

  /**
   * Determines the scope of logger
   *
   * @private
   * @param {Log} log
   * @returns
   * @memberof Logger
   */
  private scope(log: Log) {
    this.validate(log);
    if (!log.module) {
      return this.logger.scope(log.trace);
    }
    return this.signale.scope(log.module).scope(log.trace);
  }

  /**
   * use chalk to color the output on the console
   *
   * @private
   * @param {string} color
   * @param {Log} customLog
   * @param {any[]} other
   * @returns
   * @memberof Logger
   */
  private format(customLog: Log, other: any[]) {
    return [this.currentTime(), customLog.message, ...other];
  }
}

/** error object thrown when the log object is invalid */
export const logError = new Error(
  `expect a valid log to have a [trace and message] params`
);
