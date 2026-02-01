'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Share2,
  Copy,
  Check,
  QrCode,
  Calendar,
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

interface ShareButtonProps {
  event: ShareableEvent;
  /** Visually hide the label, show only icon */
  iconOnly?: boolean;
}

/**
 * Compact share button for event cards.
 * Opens a dropdown with share options on click.
 */
export function ShareButton({ event, iconOnly = true }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    setSupportsNativeShare(isNativeShareSupported());
  }, []);

  const handleCopyLink = useCallback(
    async (e: Event) => {
      e.preventDefault();
      const success = await copyEventLink(event);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    [event]
  );

  const handleNativeShare = useCallback(
    async (e: Event) => {
      e.preventDefault();
      await shareEventNative(event);
    },
    [event]
  );

  const handleDownloadIcal = useCallback(
    (e: Event) => {
      e.preventDefault();
      downloadICalFile(event);
    },
    [event]
  );

  const handleOpenQrDialog = useCallback(
    async (e: Event) => {
      e.preventDefault();
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
        // QR generation failed
      }
    },
    [event]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={iconOnly ? 'icon' : 'sm'}
            className="h-8 w-8"
            data-testid="share-button"
            aria-label={`Share ${event.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {!iconOnly && <span className="ml-2">Share</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          {/* Copy Link */}
          <DropdownMenuItem onSelect={handleCopyLink}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copy Link
              </>
            )}
          </DropdownMenuItem>

          {/* Native Share (mobile) */}
          {supportsNativeShare && (
            <DropdownMenuItem onSelect={handleNativeShare}>
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share...
            </DropdownMenuItem>
          )}

          {/* QR Code */}
          <DropdownMenuItem onSelect={handleOpenQrDialog}>
            <QrCode className="h-4 w-4" aria-hidden="true" />
            QR Code
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Calendar options */}
          <DropdownMenuItem asChild>
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Google Calendar
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a
              href={generateOutlookCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Outlook Calendar
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={handleDownloadIcal}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download .ics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md" data-testid="qr-dialog-mini">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
            <DialogDescription>
              Scan this QR code to open the event page.
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
    </>
  );
}
