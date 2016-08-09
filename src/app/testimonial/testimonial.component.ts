import {
  Component,
  Pipe,
  PipeTransform,
  ViewChild,
  ElementRef,
  ApplicationRef
} from '@angular/core';
import { TestimonialService } from './testimonial.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { AvatarDirective } from '../profile';
import { EmojiSelectComponent, EmojiPipe } from '../emoji';
import { LinkyPipe } from 'angular2-linky/linky-pipe';

@Component({
  selector: 'testimonials',
  template: require('./testimonial.html'),
  pipes: [DateFormatPipe, EmojiPipe, LinkyPipe],
  directives: [AvatarDirective, EmojiSelectComponent],
  styles: [
    require('./testimonial.css')
  ]
})
export class TestimonialComponent {

  @ViewChild('testimonialsList', {read: ElementRef}) testimonialsList: ElementRef;

  testimonials: Object[];
  allowUser: boolean = true;
  showForm: boolean = false;
  showEmojiSelect: boolean = false;
  currentTestimonial: string = '';
  currentIsAnonymous: boolean = false;
  lastScrollTop: number = 0;
  lastScrollHeight: number = 0;
  sentTestimonial: boolean = false;

  constructor(
    public testimonialService: TestimonialService,
    public router: Router,
    private appRef: ApplicationRef
  ) {

  }

  scroll() {
    this.lastScrollHeight = this.testimonialsList.nativeElement.scrollHeight;
    this.lastScrollTop = this.testimonialsList.nativeElement.scrollTop;
  }

  getUrlString(url) {
    return 'url("' + url + '")';
  }

  loadTestimonials() {
    this.testimonialService.getAll()
      .map(res => res.json())
      .subscribe(data => {
        this.testimonials = data.testimonials;
        this.allowUser = data.allowUser;
        this.appRef.tick();
      });
  }

  sendTestimonial(evt) {
    evt.preventDefault();

    if (!this.currentTestimonial)
      return;

    this.testimonialService.post(this.currentTestimonial, this.currentIsAnonymous)
      .subscribe(() => {
        this.currentTestimonial = '';
        this.currentIsAnonymous = false;
        this.sentTestimonial = true;
        this.toggleShowForm();
      }, (err) => {
        console.error(err);
      });
  }

  toggleShowForm(evt?) {
    if (evt) {
      evt.preventDefault();
    }
    this.showForm = !this.showForm;
  }

  emojiSelect(evt) {
    this.currentTestimonial += ':' + evt + ':';
    this.showEmojiSelect = false;
  }

  ngOnInit() {
    this.loadTestimonials();
  }
}