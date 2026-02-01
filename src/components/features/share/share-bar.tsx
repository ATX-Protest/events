'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Calendar,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  ExternalLink,
} from 'lucide-react';
import type { ShareableEvent } from '@/lib/share';
import {
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  downloadICalFile,
  copyEventLink,
  shareEventNative,
  isNativeShareSupported,
  getEventUrl,
} from '@/lib/share';
import QRCode from 'qrcode';

interface ShareBarProps {
  event: ShareableEvent;
}

/**
 * Full share bar for event detail pages.
 * Provides calendar add options, copy link, native share, and QR code.
 */
export function ShareBar({ event }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  // Check native share support on mount (client-side only)
  useEffect(() => {
    setSupportsNativeShare(isNativeShareSupported());
  }, []);

  const handleCopyLink = useCallback(async () => {
    const success = await copyEventLink(event);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [event]);

  const handleNativeShare = useCallback(async () => {
    await shareEventNative(event);
  }, [event]);

  const handleDownloadIcal = useCallback(() => {
    downloadICalFile(event);
  }, [event]);

  const handleOpenQrDialog = useCallback(async () => {
    // Generate QR code as data URL
    const url = getEventUrl(event);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(dataUrl);
      setQrDialogOpen(true);
    } catch {
      // QR generation failed - fail silently
    }
  }, [event]);

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      data-testid="share-bar"
    >
      {/* Add to Calendar dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="add-to-calendar-button">
            <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
            Add to Calendar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              data-testid="google-calendar-link"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Google Calendar
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={generateOutlookCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              data-testid="outlook-calendar-link"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Outlook Calendar
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDownloadIcal}
            className="flex items-center gap-2"
            data-testid="ical-download"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download .ics (Apple/Other)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Copy Link button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        data-testid="copy-link-button"
        className="min-w-[110px]"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-600" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
            Copy Link
          </>
        )}
      </Button>

      {/* Native Share button (mobile) */}
      {supportsNativeShare && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          data-testid="native-share-button"
        >
          <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
          Share
        </Button>
      )}

      {/* QR Code button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenQrDialog}
        data-testid="qr-code-button"
      >
        <QrCode className="h-4 w-4 mr-2" aria-hidden="true" />
        QR Code
      </Button>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md" data-testid="qr-dialog">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
            <DialogDescription>
              Scan this QR code to open the event page on another device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt={`QR code for ${event.title}`}
                className="rounded-lg border"
                width={256}
                height={256}
              />
            )}
            <p className="text-sm text-muted-foreground text-center break-all max-w-[256px]">
              {getEventUrl(event)}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
