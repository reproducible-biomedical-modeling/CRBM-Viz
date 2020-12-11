export enum DispatchMessage {
  // Job created on the database
  created = 'dispatch.created',
  // Job submitted to the HPC
  submitted = 'dispatch.submitted',
  // Job queued by the hpc scheduler
  queued = 'dispatch.queued',
  // Job starting running on the HPC
  started = 'dispatch.started',
  // Job done running
  finsihed = 'dispatch.finished',
  // Job failed
  failed = 'dispatch.failed',
}

export class Response {
  okay: boolean;
  _message!: DispatchMessage;
  constructor(ok: boolean = true) {
    this.okay = ok;
  }
}

export class createdResponse extends Response {
  constructor(ok: boolean = true, description?: string) {
    super(ok);
  }
  _message = DispatchMessage.created;
  description?: string;
}
export class DispatchPayload {
  _message!: DispatchMessage;
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}
export class DispatchCreatedPayload extends DispatchPayload {
  _message: DispatchMessage = DispatchMessage.created;
  fileName: string;
  simulator: string;
  version: string;
  constructor(
    id: string,
    fileName: string,
    simulator: string,
    version: string
  ) {
    super(id);
    this.fileName = fileName;
    this.simulator = simulator;
    this.version = version;
  }
}

export class DispatchSubmittedPayload extends DispatchPayload {
  _message = DispatchMessage.submitted;
  constructor(id: string) {
    super(id);
  }
}
