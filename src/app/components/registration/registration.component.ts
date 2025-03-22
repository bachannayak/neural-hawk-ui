import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WebcamModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  RegistrationForm: FormGroup;
  accountTypeData: string[] = ["saving","current","loan"];
  photoSelectionData: string[] = ["Use Desktop","Use Camera"];
  selectedFile: File | null = null;
  selectedCameraData:string = "";
  showCamera:boolean = false;
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  errors: WebcamInitError[] = [];
  deviceId: string = "";
  photoUploadSuccess: string = "";
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  webcamImage: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  constructor(private fb: FormBuilder) {
    this.RegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      phoneno: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      address: ['', [Validators.required]],
      govtidcard: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern("[0-5 ]{5}")]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      photo: ['', [Validators.required]],
      accounttype: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    let loadingSpinnerNone = document.getElementById("loading");
    if (loadingSpinnerNone !== null) {
      loadingSpinnerNone.style.display = "none";
    }
   
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  onFileSelected(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      this.selectedCameraData = "";
    }
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage, webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    this.selectedCameraData = webcamImage.imageAsDataUrl;
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.selectedFile = null;
    this.photoUploadSuccess = "Your photo is successfully uploaded!";
    let cameraModalClose = document.getElementById("cameraModal");
    if (cameraModalClose !== null) {
      cameraModalClose.style.display = "none";
    }
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  openCameraModal() {
    let cameraModal = document.getElementById("cameraModal");
    if (cameraModal !== null) {
      cameraModal.style.display = "block";
    }
  }

  closeCameraModal() {
    let cameraModal = document.getElementById("cameraModal");
    if (cameraModal !== null) {
      cameraModal.style.display = "none";
    }
  }

  closeSuccessModal() {
    let successModal = document.getElementById("successModal");
    if (successModal !== null) {
      successModal.style.display = "none";
    }
  }

  registrationSubmit() {
    console.log('this.RegistrationForm ', this.RegistrationForm.getRawValue());
    let getRegistrationValues = this.RegistrationForm.getRawValue();
    if (getRegistrationValues) {
      let registrationObj  = {
        accounttype: getRegistrationValues.accounttype,
        address: getRegistrationValues.address,
        dob: getRegistrationValues.dob,
        govtidcard: getRegistrationValues.govtidcard,
        name: getRegistrationValues.name,
        phoneno: getRegistrationValues.phoneno,
        photo: this.selectedFile !== null ? this.selectedFile : this.selectedCameraData !== "" ? this.selectedCameraData : null,
        pincode: getRegistrationValues.pincode,
        state: getRegistrationValues.state
      }

      console.log('registrationObj ', registrationObj);

      let loadingSpinner = document.getElementById("loading");
      if (loadingSpinner !== null) {
        loadingSpinner.style.display = "block";
      }

      if (registrationObj) {
        let successModalOpen = document.getElementById("successModal");
        if (successModalOpen !== null) {
          successModalOpen.style.display = "block";
        }

        setTimeout(() => {
          let loadingSpinnerNone = document.getElementById("loading");
          if (loadingSpinnerNone !== null) {
            loadingSpinnerNone.style.display = "none";
          }
        }, 2000)
      }
    }
  }
}
